<template>
	<BaseModal
		class="mt-32 w-4/6 max-w-2xl z-50 mx-72"
		title="Créer un événement"
		:isLoading="getUiIsLoading"
		:isActive="isActive"
		:mode="getUiModalState.modalMode"
		@close="close"
	>
		<EventForm />
	</BaseModal>
</template>
<script setup lang='ts'>
import { useUiStore } from '@/store'

interface Props {
	isActive: boolean
}
const props = withDefaults(defineProps<Props>(), {
	isActive: false,
})

const uiStore = useUiStore()

const { getUiIsLoading, getUiModalState, resetUIState } = uiStore

const emit = defineEmits<{
	(e: 'close'): void
}>()

function close() {
	emit('close')
	resetUIState()
}

</script>