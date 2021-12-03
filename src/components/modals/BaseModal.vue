<template>
<transition name="fade">
	<div
		v-if="isModalOpen"
		class="absolute left-80 top-0 bottom-0 flex items-center justify-center transition ease-in-out duration-700"
	>
		<div class="bg-white px-5 py-4 shadow-2xl rounded-lg relative">
			<div class="text-center text-xl font-semibold text-black dark:text-white">
				{{ title }}
			<div
				class="rotate-45 cursor-pointer absolute right-2 top-0"
				@click="closeModal"
			>+</div>
			</div>
			<Loader
				v-if="isLoading"
				:isLoading="isLoading"
				:type="LoaderTypeEnum.BOUNCE"
			/>
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

watch(() => props.isActive, (newVal) => {
	isModalOpen.value = newVal
})

function closeModal() {
	isModalOpen.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>