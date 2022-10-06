<!-- Please remove this file from your project -->
<template>
  <canvas ref="canvas" style="width: 500px; height: 500px" />
</template>

<script>
import * as three from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default {
  mounted() {
    const scene = new three.Scene();
    const camera = new three.PerspectiveCamera(30, 1.0, 0.1, 1000);
    camera.rotation.x = Math.PI * 0.5
    camera.position.y = -10
    camera.position.z = 0

    const renderer = new three.WebGLRenderer({ canvas: this.$el });
    renderer.setSize(
      this.$el.getBoundingClientRect().width * window.devicePixelRatio,
      this.$el.getBoundingClientRect().height * window.devicePixelRatio,
      false
    );

    let macbook = null;
    const loader = new GLTFLoader()
    loader.load('macbook.glb', gltf => {
      macbook = gltf.scene.children[0]
      macbook.material = new three.MeshBasicMaterial({ color: 0xffffff })
      // macbook.rotation.x = 
      scene.add(macbook)
    }, undefined, error => {
      console.error(error)
    })

    function animate() {
      requestAnimationFrame(animate);

      if (macbook) {
        macbook.rotation.z += 0.01;
      }


      // renderer.getContext().colorMask(false, false, false, false)
      renderer.render(scene, camera)
    };

    animate();
  }
}
</script>
