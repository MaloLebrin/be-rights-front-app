<template>
	<div :id="`accordion${index}`" class="flex items-center lg:w-full">
		<BAccordion
			class="flex flex-col items-center mb-6 bg-white dark:bg-blue-dark_bold rounded-full shadow-2xl hover:-translate-y-2 animate-fade-in-down max-w-3xl pb-4 w-3/4"
		>
			<template #title>
				<slot name="title" />
			</template>

			<slot />
		</BAccordion>

		<div
			v-if="hasSlotButtons"
			class="flex flex-col ml-4 px-4 py-2 rounded-xl text-xs duration-500 ease-in-out transition-all w-1/5"
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
