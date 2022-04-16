<template>
<div :class="classes">
  <div
    v-if="isCloseable"
    class="absolute -top-1.5 -right-1.5 bg-white border-2 border-black-light text-black rounded-full cursor-pointer"
    @click="onClose"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      style=" fill:#000000;"
    >
      <path
        d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"
      />
    </svg>
  </div>
  <div class="flex items-center justify-center">
    <slot />
  </div>
</div>
</template>

<script setup lang="ts">
import { TagVariantsEnum } from '@/types/Tag'

interface Props {
  variant?: TagVariantsEnum
  isCloseable?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  variant: TagVariantsEnum.BLUE,
  isCloseable: true,
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

function onClose() {
  emit('close')
}

const commonClasses = 'relative rounded px-3 py-2 shadow-2xl border hover:text-white text-sm'

const classes = computed(() => {
  switch (props.variant) {
    case TagVariantsEnum.BLUE:
      return `${commonClasses} bg-blue-200 text-blue-800 hover:bg-blue-500 border-blue-500`
    case TagVariantsEnum.ORANGE:
      return `${commonClasses} bg-orange-200 text-orange-800 hover:bg-orange-500 border-orange-500`

    case TagVariantsEnum.RED:
      return `${commonClasses} bg-red-200 text-red-800 hover:bg-red-500 border-red-500`

    case TagVariantsEnum.GREEN:
      return `${commonClasses} bg-green-200 text-green-800 hover:bg-green-500 border-green-500`

    case TagVariantsEnum.PURPLE:
      return `${commonClasses} bg-purple-200 text-purple-800 hover:bg-purple-500 border-purple-500`
  }
})
</script>
