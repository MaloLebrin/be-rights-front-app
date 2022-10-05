<template>
<div :class="classes">
  <div
    class="z-20 w-full h-full"
    @click="click"
  >
    <slot name="title" />
  </div>
  <div
    ref="contentAccordion"
    class="relative z-0 w-full h-full overflow-hidden transition-all duration-700 ease-in-out transform rounded"
    :class="isAccordionOpen ? 'opacity-1' : 'opacity-0'"
    :style="isAccordionOpen ? openClasses : 'max-height: 0'"
  >
    <slot />
  </div>
</div>
</template>

<script setup lang="ts">
interface Props {
  title?: string | null
  isOpen?: boolean
  variant?: 'primary' | 'warning' | 'danger' | 'success'
}

const props = withDefaults(defineProps<Props>(), {
  title: null,
  isOpen: false,
  variant: 'primary',
})

const emit = defineEmits<{
  (e: 'open', isOpen: boolean): void
}>()

const classes = computed(() => {
  const common = 'border-2 rounded-t-lg rounded-b-lg mt-2 z-20 rounded cursor-pointer'
  switch (props.variant) {
    case 'primary':
      return `${common} bg-white text-dark dark:text-white dark:bg-blue-dark_bold`

    case 'warning':
      return `${common} bg-orange text-white`

    case 'danger':
      return `${common} bg-red text-white`

    case 'success':
      return `${common} bg-green text-white`

    default:
      return `${common} bg-white text-dark`
  }
})

const isAccordionOpen = ref(props.isOpen)
const contentAccordion = ref<null | HTMLElement>(null)
const openClasses = computed(() => contentAccordion.value ? `max-height: ${contentAccordion.value.scrollHeight}px` : 'hidden')

function click() {
  isAccordionOpen.value = !isAccordionOpen.value
  emit('open', isAccordionOpen.value)
}
</script>
