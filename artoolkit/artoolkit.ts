export class ARToolkit {

    private readonly worker: Worker
    private readonly video: HTMLVideoElement
    private readonly canvas: HTMLCanvasElement
    private readonly context: CanvasRenderingContext2D

    constructor(private onUpdate: (image: ImageData, projection: Float64Array, transform: Float64Array) => void) {
        this.worker = new Worker(
            new URL('artoolkit.worker.ts', import.meta.url),
            {type: 'module'}
        )
        this.worker.onmessage = event => this.onMessage(event.data)

        this.video = document.createElement('video')
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')

        navigator.mediaDevices
            .getUserMedia({
                audio: false,
                video: {facingMode: "environment"}
            })
            .then(stream => {
                const settings = stream.getVideoTracks()[0].getSettings();
                this.canvas.width = settings.width || 0;
                this.canvas.height = settings.height || 0;
                this.video.srcObject = stream;
                this.worker.postMessage({
                    type: 'init',
                    width: settings.width,
                    height: settings.height,
                    camera: '/camera.dat',
                    marker: '/marker/pinball'
                })

                return this.video.play()
            })
            .catch(error => {
                console.log("An error occured! " + error);
            })
    }

    destroy() {
        this.worker.terminate()
    }

    private onMessage(msg: any) {
        if (msg.type === 'update') {
            this.onUpdate(msg.image, msg.projection, msg.transform)
        }

        if (msg.type === 'ready' || msg.type === 'update') {
            this.worker.postMessage({
                type: 'process',
                normalImage: this.getVideoFrame(this.canvas.width, this.canvas.height),
                smallImage: this.getVideoFrame(720, 720 * this.canvas.height / this.canvas.width)
            })
        }
    }

    private getVideoFrame(width: number, height: number): ImageData {
        width = Math.min(width, this.canvas.width)
        height = Math.min(height, this.canvas.height)

        this.context.drawImage(this.video, 0, 0, width, height)
        return this.context.getImageData(0, 0, width, height)
    }
}