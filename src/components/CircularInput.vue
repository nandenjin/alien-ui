<template lang="pug">
  svg.circular-input(ref="container" @mousedown="onMouseDown" viewBox="-50, -50, 100, 100")
    g
      circle.circular-input_circle(x="0" y="0" r="45" style="stroke: #222")
      path.circular-input_circle(v-if="(v || 0) < 1" :d="pathD" :style="`stroke: ${color}`")
      circle.circular-input_circle(v-else :style="`stroke: ${color}`" x="0" y="0" r="45")
      text.circular-input_value(:style="`fill: ${v > 0 ? '#fff' : '#666'}`" x="0" y="0")
        | {{ Math.floor(value) || 0 }}
</template>

<script>
export default {
  props: {
    value: { type: Number, required: true },
    readonly: { type: Boolean, default: false },
    max: { type: Number, default: 1 },
    min: { type: Number, default: 0 }
  },

  data() {
    return {
      on: false,
      initX: 0,
      initY: 0,
      initValue: 0
    }
  },

  computed: {
    color() {
      const v = this.v || 0
      return `hsl(${(1 - v) * 300}, ${v === 0 ? '0%' : '100%'}, ${
        v === 0 ? '20%' : '50%'
      })`
    },

    // Normalized input value
    v() {
      return (this.value - this.min) / (this.max - this.min) || 0
    },

    pathD() {
      const v = this.v || 0
      const x = Math.cos((v * 2 - 1.5) * Math.PI) * 45
      const y = Math.sin((v * 2 - 1.5) * Math.PI) * 45
      return `M0 45 A 45 45, 0, ${v > 0.5 ? 1 : 0}, 1, ${x} ${y}`
    }
  },

  mounted() {
    window.addEventListener('mousemove', e => this.onMouseMove(e))
    window.addEventListener('mouseup', () => this.onMouseUp())
  },

  destroyed() {
    window.removeEventListener('mousemove', e => this.onMouseMove(e))
    window.removeEventListener('mouseup', () => this.onMouseUp())
  },

  methods: {
    onMouseDown(e) {
      if (this.readonly) return
      this.on = true
      this.initX = e.pageX
      this.initY = e.pageY
      this.initValue = this.v || 0
    },

    onMouseUp() {
      this.on = false
    },

    onMouseMove(e) {
      if (this.on) {
        const x = e.pageX
        const y = e.pageY

        const value =
          Math.min(
            Math.max(
              this.initValue + (this.initY - y - (this.initX - x)) / 200,
              0
            ),
            1
          ) *
            (this.max - this.min) +
          this.min

        this.$emit('input', value, e)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.circular-input
  width: 40px
  height: 40px
  user-select: none

  &_circle
    fill: none
    stroke-width: 10px

  &_value
    font-family: monospace
    font-size: 30px
    text-anchor: middle
    dominant-baseline: central
    vertical-align: middle
</style>
