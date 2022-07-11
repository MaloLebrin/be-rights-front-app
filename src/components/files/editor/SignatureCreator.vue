<template>
<node-view-wrapper class="border-2 border-red-500 draw">
  <input
    v-model="size"
    type="number"
    min="1"
    max="10"
  >
  <BaseButton @click="clear">
    clear
  </BaseButton>
  <svg
    ref="canvas"
    viewBox="0 0 500 250"
    class="bg-white"
  >
    <template v-for="item in node.attrs.lines">
      <path
        v-if="item.id !== id"
        :id="`id-${item.id}`"
        :key="item.id"
        :d="item.path"
        :stroke="item.color"
        :stroke-width="item.size"
      />
    </template>
  </svg>
</node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import * as d3 from 'd3'
import { v4 as uuid } from 'uuid'

export default {
  name: 'Paper',

  components: {
    NodeViewWrapper,
  },

  props: nodeViewProps,

  data() {
    return {
      color: '#000000',
      size: Math.ceil(Math.random() * Math.floor(10)),
      svg: null,
      path: null,
      points: [],
      drawing: false,
      id: uuid(),
    }
  },

  mounted() {
    this.svg = d3.select(this.$refs.canvas)

    this.svg
      .on('mousedown', this.onStartDrawing)
      .on('mouseup', this.onEndDrawing)
      .on('mouseleave', this.onEndDrawing)
      .on('touchstart', this.onStartDrawing)
      .on('touchend', this.onEndDrawing)
      .on('touchleave', this.onEndDrawing)
  },

  methods: {
    onStartDrawing(event) {
      this.drawing = true
      this.points = []
      this.path = this.svg
        .append('path')
        .data([this.points])
        .attr('id', `id-${this.id}`)
        .attr('stroke', this.color)
        .attr('stroke-width', this.size)

      const moveEvent = event.type === 'mousedown'
        ? 'mousemove'
        : 'touchmove'

      this.svg.on(moveEvent, this.onMove)
    },

    onMove(event) {
      event.preventDefault()
      this.points.push(d3.pointers(event)[0])
      this.tick()
    },

    onEndDrawing() {
      this.svg.on('mousemove', null)
      this.svg.on('touchmove', null)

      if (!this.drawing) {
        return
      }

      this.drawing = false
      this.svg.select(`#id-${this.id}`).remove()
      this.id = uuid()
    },

    tick() {
      requestAnimationFrame(() => {
        this.path.attr('d', points => {
          const path = d3.line().curve(d3.curveBasis)(points)
          const lines = this.node.attrs.lines.filter(item => item.id !== this.id)

          this.updateAttributes({
            lines: [
              ...lines,
              {
                id: this.id,
                color: this.color,
                size: this.size,
                path,
              },
            ],
          })

          return path
        })
      })
    },

    clear() {
      this.updateAttributes({
        lines: [],
      })
    },
  },
}
</script>

<style>
.draw svg {
  background: #f1f3f5;
  cursor: crosshair;
}

.draw path {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
