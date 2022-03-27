<template>
  <div :id="`accordion${index}`" class="flex items-center lg:w-full">
    <BaseAccordion
      class="flex flex-col items-center w-3/4 max-w-3xl pb-4 mb-6 bg-white rounded-full shadow-2xl dark:bg-blue-dark_bold hover:-translate-y-2 animate-fade-in-down"
    >
      <template #title>
        <slot name="title" />
      </template>

      <slot />
    </BaseAccordion>

    <div
      v-if="hasSlotButtons"
      class="flex flex-col w-1/5 px-4 py-2 ml-4 text-xs transition-all duration-500 ease-in-out rounded-xl"
      :class="extraButtonOpen === index ? 'opacity-1' : 'opacity-0'"
    >
      <slot name="extraButton" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
  index: {
    type: Number as PropType<number>,
    required: true
  }
})

const extraButtonOpen = ref<null | number>(null)

const slots = useSlots()
const hasSlotButtons = computed(() => slots.extraButton)

onMounted(() => {
  const item = document.getElementById(`accordion${props.index}`)
  item?.addEventListener('mouseover', () => {
    extraButtonOpen.value = props.index
  })
  item?.addEventListener('mouseout', () => {
    extraButtonOpen.value = null
  })
})

onBeforeUnmount(() => {
  const item = document.getElementById(`accordion${props.index}`)
  item?.removeEventListener('mouseover', () => extraButtonOpen.value = null)
  item?.removeEventListener('mouseout', () => extraButtonOpen.value = null)
})
</script>
