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
<script setup lang='ts'>
import { computed } from 'vue'
import { TagVariantsEnum } from '@/types/Tag'

interface Props {
	variant?: TagVariantsEnum
	isCloseable?: boolean
}
const props = withDefaults(defineProps<Props>(), {
	variant: TagVariantsEnum.PRIMARY,
	isCloseable: true,
})

const emit = defineEmits<{
	(e: 'close'): void
}>()

function onClose() {
	emit('close')
}

const commonClasses = 'relative rounded px-4 py-2 shadow-2xl'

const classes = computed(() => {
	switch (props.variant) {
		case TagVariantsEnum.PRIMARY:
			return `${commonClasses} bg-blue text-white hover:bg-blue-dark dark:hover:bg-gray-800`
		case TagVariantsEnum.WARNING:
			return `${commonClasses} bg-orange-500 text-white hover:bg-orange-800`

		case TagVariantsEnum.DANGER:
			return `${commonClasses} bg-red text-white hover:bg-red-light`

		case TagVariantsEnum.SUCCESS:
			return `${commonClasses} bg-green text-white hover:bg-green-800`

		case TagVariantsEnum.PROMOTION:
			return `${commonClasses} bg-purple text-white hover:bg-purple-800`
	}
})

</script>