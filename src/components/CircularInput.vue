<template>
  <svg
    ref="container"
    @mousedown="onMouseDown"
    class="c-input"
    viewBox="-50, -50, 100, 100"
  >
    <g>
      <circle class="circle" x="0" y="0" r="45" style="stroke: #222" />
      <path
        v-if="(value || 0) < 255"
        :d="pathD"
        :style="`stroke: ${color}`"
        class="circle"
      />
      <circle
        v-else
        :style="`stroke: ${color}`"
        class="circle"
        x="0"
        y="0"
        r="45"
      />
      <text
        :style="`fill: ${value > 0 ? '#fff' : '#666'}`"
        class="value"
        x="0"
        y="0"
      >
        {{ Math.floor(value) || 0 }}
      </text>
    </g>
  </svg>
</template>

<script>
export default {
  props: ['value', 'readonly'],
  data() {
    return {
      on: false,
      initX: 0,
      initY: 0,
      initV: 0
    }
  },
  computed: {
    color() {
      const v = this.value || 0
      return `hsl(${(1 - v / 255) * 300}, ${v === 0 ? '0%' : '100%'}, ${
        v === 0 ? '20%' : '50%'
      })`
    },

    pathD() {
      const v = this.value / 255 || 0
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
      if (this.readonly) return false
      this.on = true
      this.initX = e.pageX
      this.initY = e.pageY
      this.initV = this.value || 0
    },

    onMouseUp() {
      this.on = false
    },

    onMouseMove(e) {
      if (this.on) {
        const x = e.pageX
        const y = e.pageY

        this.$emit(
          'input',
          Math.min(
            Math.max(
              Math.floor(this.initV + (this.initY - y - (this.initX - x)) / 1),
              0
            ),
            255
          ),
          e
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.c-input
  width: 40px
  height: 40px
  user-select: none

  .circle
    fill: none
    stroke-width: 10px

  .value
    font-family: monospace
    font-size: 30px
    text-anchor: middle
    dominant-baseline: central
    vertical-align: middle
</style>
