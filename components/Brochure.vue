<template>
  <div>
    <canvas ref="canvas"/>
    <button @click="worker.postMessage('init')">test</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    proc_video: null as (HTMLVideoElement | null),
    proc_canvas: null as (HTMLCanvasElement | null),
    worker: null as (Worker | null)
  }),
  computed: {
    canvas(): HTMLCanvasElement {
      return this.$refs.canvas as HTMLCanvasElement
    },
    context(): CanvasRenderingContext2D {
      return this.canvas.getContext('2d')!
    }
  },
  mounted() {
    console.log("worker", new URL('../plugins/artoolkit.worker.js', import.meta.url))
    this.worker = new Worker(new URL('../plugins/artoolkit.worker.js', import.meta.url), {
      type: 'module',
    })
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {facingMode: "environment"}
      })
      .then(stream => {
        this.proc_video = document.createElement('video')
        this.proc_canvas = document.createElement('canvas')

        const settings = stream.getVideoTracks()[0].getSettings();
        this.proc_canvas.width = settings.width || 0;
        this.proc_canvas.height = settings.height || 0;
        this.proc_video.srcObject = stream;
        this.proc_video.play()
        this.onFrame()
      })
      .catch(function (err) {
        console.log("An error occured! " + err);
      })
  },
  methods: {
    onFrame() {
      const video = this.proc_video!
      const canvas = this.proc_canvas!
      const context = canvas.getContext('2d')!
      context.drawImage(video, 0, 0)
      const data = context.getImageData(0, 0, canvas.width, canvas.height)

      this.canvas.width = canvas.width
      this.canvas.height = canvas.height
      this.context.putImageData(data, 0, 0)

      requestAnimationFrame(this.onFrame)
    }
  }
})
</script>