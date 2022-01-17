<template>
	<BaseModal
		class="z-50 w-4/6 max-w-2xl mt-32 mx-72"
		:title="getModalTitle"
		:isLoading="uiStore.getUIIsLoading"
		:isActive="isActive"
		@close="close"
	>
		<FileForm
			v-if="mode === ModalModeEnum.EDIT || mode === ModalModeEnum.CREATE"
			:file="uiStore.getUiModalData?.file"
			:mode="mode"
			@submit="onSubmit"
		/>
		<div v-else-if="mode === ModalModeEnum.DELETE" class="space-y-4">
			<p class="text-center text-gray-500">Êtes-vous sûr de vouloir supprimer le fichier suivant ?</p>
			<p class="text-center text-gray-700 dark:text-white">Nom: {{ uiStore.getUiModalData?.file.name }}</p>
			<p
				class="text-center text-gray-700 dark:text-white"
			>Description: {{ uiStore.getUiModalData?.file.description }}</p>

			<div class="flex items-center justify-center space-x-4">
				<BButton variant="danger" :isLoading="uiStore.getUIIsLoading" @click="deleteFile">
					<div class="flex items-center">
						<TrashIconOutline class="w-4 h-4 mr-2" />
						<span>Supprimer</span>
					</div>
				</BButton>
				<BButton variant="white" @click="close()">
					<div class="flex items-center">
						<XCircleIconOutline class="w-4 h-4 mr-2" />
						<span>Annuler</span>
					</div>
				</BButton>
			</div>
		</div>
	</BaseModal>
</template>

<script setup lang="ts">
import { fileHook } from '@/hooks'
import { useUiStore } from '@/store'
import { ModalModeEnum } from '@/store/typesExported'

interface Props {
	mode?: ModalModeEnum
	isActive: boolean
}

const props = withDefaults(defineProps<Props>(), {
	isActive: false,
	mode: undefined,
})

const uiStore = useUiStore()
const { IncLoading, DecLoading, resetUiModalState } = uiStore
const { deleteOne } = fileHook()

async function deleteFile() {
	if (uiStore.getUiModalState && uiStore.getUiModalData?.file) {
		IncLoading()
		const id = uiStore.getUiModalData.file.id
		await deleteOne(id)
		DecLoading()
		close()
	}
}

const emit = defineEmits<{
	(e: 'close'): void
	(e: 'submit'): void
}>()

function close() {
	resetUiModalState()
	emit('close')
}

function onSubmit() {
	emit('submit')
	close()
}

const getModalTitle = computed(() => {
	switch (props.mode) {
		case ModalModeEnum.CREATE:
			return 'Créer un Fichier'

		case ModalModeEnum.EDIT:
			return 'Modifier un Fichier'

		case ModalModeEnum.DELETE:
			return 'Supprimer un Fichier'

		default:
			return 'Créer un Fichier'
	}
})

</script>