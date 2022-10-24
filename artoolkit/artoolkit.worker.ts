import ARToolkitNFT from '@webarkit/jsartoolkit-nft'

self.onmessage = event => {
    const msg = event.data
    switch (msg.type) {
        case 'init':
            init(msg.width, msg.height, msg.camera, msg.marker)
            break
        case 'process':
            process(msg.normalImage, msg.smallImage)
            break
    }
}

let ar: any = null
let transform: Float64Array = null
let ready = false

function init(width, height, camera, marker) {
    ARToolkitNFT.ARControllerNFT
        .initWithDimensions(
            width,
            height,
            camera
        )
        .then(arController => {
            ar = arController

            ar.addEventListener("getNFTMarker", event => {
                transform = event.data.matrixGL_RH
            });

            ar.loadNFTMarker(marker,
                id => {
                    ar.trackNFTMarkerId(id);
                    postMessage({type: "ready"});
                    ready = true
                },
                () => {
                    console.log("An error occured while loading NFT marker");
                }
            ).then()
        })
        .catch(error => {
            console.log("An error occured! " + error);
        })
}

function process(normalImage: ImageData, smallImage: ImageData) {
    if (!ready) return

    transform = null
    ar.process(smallImage);
    postMessage({
        type: "update",
        image: normalImage,
        projection: ar.getCameraMatrix(),
        transform
    });
}
