<template>
  <div class="position: relative">
    <canvas ref="background" style="position: absolute; top: 0; left: 0"/>
    <canvas ref="graphics" style="position: absolute; top: 0; left: 0"/>
  </div>
</template>

<script>
import {ARToolkit} from '../artoolkit/artoolkit'
import * as THREE from 'three'

export default {
  mounted() {
    this.arToolkit = new ARToolkit(this.onUpdate)

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.$refs['graphics'],
      alpha: true, antialias: true
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.scene = new THREE.Scene()
    this.camera = new THREE.Camera()
    this.root = new THREE.Object3D()
    this.sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 8, 8),
        new THREE.MeshNormalMaterial()
    )

    this.scene.add(this.camera)
    this.scene.add(this.root)
    this.root.add(this.sphere)

    this.root.matrixAutoUpdate = false
    this.sphere.material.flatShading
    this.sphere.scale.set(200, 200, 200)
    //this.sphere.position.set(0, 0, -100)
  },
  destroyed() {
    if (this.arToolkit) this.arToolkit.destroy()
  },
  methods: {
    onUpdate(image, projection, transform) {
      const background = this.$refs['background']
      const graphics = this.$refs['graphics']
      const context = background.getContext('2d')

      background.width = image.width
      background.height = image.height
      graphics.width = image.width
      graphics.height = image.height

      if (transform) {
        this.setMatrix(this.camera.projectionMatrix, projection)
        this.setMatrix(this.root.matrix, transform)
        this.sphere.visible = true
      } else {
        this.sphere.visible = false
      }

      this.renderer.render(
          this.scene,
          this.camera
      )

      context.putImageData(image, 0, 0)
    },
    setMatrix(matrix, value) {
      const array = [];
      for (var key in value) {
        array[key] = value[key];
      }

      if (typeof this.root.matrix.elements.set === "function") {
        matrix.elements.set(array)
      } else {
        matrix.elements = [].slice.call(array)
      }
    }
  }
}
</script>