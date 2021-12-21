<template>
	<BaseModal
		class="mt-32"
		title="Créer un événement"
		:isLoading="getUiIsLoading"
		:isActive="isActive"
		:mode="getUIState.modalMode"
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

const { getUiIsLoading, getUIState, resetUIState } = uiStore

const emit = defineEmits<{
	(e: 'close'): void
}>()

function close() {
	emit('close')
	resetUIState()
}

</script>