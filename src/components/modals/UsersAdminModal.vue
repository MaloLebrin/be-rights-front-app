<template>
<transition name="fade">
	<div
		v-if="isModalOpen"
		class="absolute left-80 top-0 bottom-0 flex items-center justify-center transition ease-in-out duration-700"
	>
		<div class="bg-white px-5 py-4 shadow-2xl rounded-lg">
			<div class="text-center text-xl font-semibold text-black dark:text-white">
				Supprimer l'utilisateur
			</div>
		
		</div>
	</div>
</transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
	isActive: boolean
}
const props = withDefaults(defineProps<Props>(), {
	isActive: false,
})

const isModalOpen = computed(() => props.isActive)
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