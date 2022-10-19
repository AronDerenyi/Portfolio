<template>
  <div>
    <h1>Brochure</h1>
  </div>
</template>

<script>
import {ARToolkit} from '../artoolkit/artoolkit'

export default {
  mounted() {
    this.arToolkit = new ARToolkit(this.onFrame)
  },
  destroyed() {
    if (this.arToolkit) this.arToolkit.destroy()
  },
  methods: {
    onFrame(background) {
      console.log("update!")
    }
  }
}
</script>