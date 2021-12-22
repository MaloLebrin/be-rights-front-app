<template>
	<BaseModal
		class="w-5/6 max-w-2xl"
		title="Créer un destinataire"
		:isLoading="state.isLoading"
		:isActive="isActive"
		@close="close"
	>
		<EmployeeForm :eventId="eventId" :userId="userId" @submit="onSubmit" />
	</BaseModal>
</template>

<script setup lang='ts'>
import { EmployeeType, ModalModeEnum } from '@/store/typesExported'

interface Props {
	mode?: ModalModeEnum
	isActive: boolean
	employee?: EmployeeType
	eventId?: number
	userId?: number
}

const state = reactive({
	isLoading: false,
})

const props = withDefaults(defineProps<Props>(), {
	isActive: false,
	employee: undefined,
	mode: undefined,
	eventId: undefined,
	userId: undefined,
})

const emit = defineEmits<{
	(e: 'close'): void
	(e: 'submit'): void
}>()

function close() {
	emit('close')
}

function onSubmit() {
	emit('submit')
	close()
}

</script>