<template>
	<BaseModal
		class="mt-32 w-4/6 max-w-2xl z-50 mx-72"
		title="Créer un destinataire"
		:isLoading="uiStore.getUIIsLoading"
		:isActive="isActive"
		@close="close"
	></BaseModal>
</template>

<script setup lang="ts">
import { useUiStore } from '@/store'
import { EmployeeType, ModalModeEnum } from '@/store/typesExported'

interface Props {
	mode?: ModalModeEnum
	isActive: boolean
	employee?: EmployeeType
	eventId?: number
	userId?: number
}

withDefaults(defineProps<Props>(), {
	isActive: false,
	employee: undefined,
	mode: undefined,
	eventId: undefined,
	userId: undefined,
})

const uiStore = useUiStore()

</script>