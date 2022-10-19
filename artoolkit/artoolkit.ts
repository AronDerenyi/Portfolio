export class ARToolkit {

    private worker: Worker
    private video: HTMLVideoElement
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D

    constructor(private onUpdate: (ImageData) => void) {
        this.worker = new Worker(
            new URL('artoolkit.worker.ts', import.meta.url),
            {type: 'module'}
        )
        this.worker.postMessage('init')

        this.video = document.createElement('video')
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.update()
    }

    destroy() {
        this.worker.terminate()
    }

    private update() {
        this.onUpdate(null)
        requestAnimationFrame(() => this.update())
    }
}