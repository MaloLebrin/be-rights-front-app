<template>
	<transition name="fade">
		<div
			id="base-modal"
			v-show="isModalOpen"
			class="absolute dark:bg-blue-dark_bold bg-white top-0 left-0 right-0 w-full flex items-center justify-center transition ease-in-out duration-700 rounded-lg shadow-2xl TranslateUpAnimation"
		>
			<div class="px-5 py-4 shadow-2xl rounded-lg relative w-full h-full">
				<div class="text-center text-xl font-semibold text-black dark:text-white">
					{{ title }}
					<div
						class="rotate-45 cursor-pointer absolute right-2 top-2 bg-blue-dark_bold dark:bg-white rounded-full h-6 w-6 text-white dark:text-blue-dark_bold text-2xl flex items-center justify-center"
						@click="closeModal"
					>+</div>
				</div>
				<Loader v-if="isLoading" :isLoading="isLoading" :type="LoaderTypeEnum.BOUNCE" />
				<div v-else>
					<slot />
				</div>
			</div>
		</div>
	</transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { LoaderTypeEnum } from '@/types/index'

interface Props {
	isActive: boolean
	title: string
	isLoading: boolean
}
const props = withDefaults(defineProps<Props>(), {
	isActive: false,
	title: '',
	isLoading: false,
})
const isLoading = ref(props.isLoading)
const isModalOpen = ref(props.isActive)

watch(() => props.isActive, newVal => {
	isModalOpen.value = newVal
})

function closeModal() {
	isModalOpen.value = false
	emit('close')
}

const emit = defineEmits<{
	(e: 'close'): void
}>()

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.8s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>