<template>
<div
	class="relative bg-white dark:bg-blue-dark_bold w-full py-2 border border-gray-400 dark:border-indigo-100
	rounded-xl text-gray-700 dark:text-white-break shadow-inner cursor-pointer"
	:tabindex="tabindex"
>	
	<div
		class="flex items-center relative pt-3"
		@click="toggleSelect"
	>
		<label
			class="selected px-4"
		>
			{{ selected }}
		</label>
		<span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
			<svg
				class="h-5 w-5 text-gray-400"
				viewBox="0 0 20 20"
				fill="none"
				stroke="currentColor"
			>
				<path
				d="M7 7l3-3 3 3m0 6l-3 3-3-3"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				/>
			</svg>
		</span>
	</div>
	<ul
		class="overflow max-h-80"
		:class="{ 'hidden': !isOpen }"
	>
			<option
				class="hover:bg-gray-100 dark:hover:bg-gray-800 py-1 overflow-hidden overflow-y-auto max-h-80 px-4"
				v-for="(option, i) of options"
				:key="i"
				@click="onOptionClick(option)"
			>
				{{ option }}
			</option>
	</ul>
</div>
</template>
<script setup lang='ts'>
import { ref } from 'vue'

interface Props {
	options: string[]
	default: string
	tabindex?: number
	required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  options: [],
  default: '',
  tabindex: 0,
})

const isOpen = ref(false)
const selected = ref(props.default ? props.default : props.options.length > 0 ? props.options[0] : null)

const emit = defineEmits<{
  (e: 'selected', option: string): void
}>()

function onOptionClick(option: string) {
	selected.value = option
	emit('selected', option)
	onClose()
}

function onClose() {
	isOpen.value = false
}

function toggleSelect() {
	isOpen.value = !isOpen.value
}
</script>
