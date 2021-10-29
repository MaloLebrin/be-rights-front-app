<template>
  <div class="bg-red-light w-28 h-28 rounded-full opacity-90 relative">
    <span class="text-black font-extrabold text-9xl bg-none absolute right-0">{{ stepNumber }}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StepBubble',
  props: {
    stepNumber: {
      type: Number,
      default: 0,
    },
  },
})
</script>
