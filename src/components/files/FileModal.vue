<template>
<BaseModal
  :is-active="isActive"
  @close="close"
>
  <div class="px-4 py-2 sm:flex sm:items-start">
    <div
      v-if="mode === ModalModeEnum.DELETE"
      class="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10"
    >
      <ExclamationIconOutline
        class="w-6 h-6 text-red-600"
        aria-hidden="true"
      />
    </div>
    <div class="mt-3 space-y-2 text-center sm:mt-0 sm:ml-4 sm:text-left">
      <DialogTitle
        as="h3"
        class="text-lg font-medium leading-6 text-gray-900"
      >
        {{ getModalTitle }}
      </DialogTitle>

      <div
        v-if="mode === ModalModeEnum.EDIT || mode === ModalModeEnum.CREATE"
        class="flex items-center justify-center"
      >
        <FileForm
          :file="uiStore.getUiModalData?.file"
          :mode="mode"
          @submit="onSubmit"
        />
      </div>
      <div
        v-else-if="mode === ModalModeEnum.DELETE"
        class="mt-2 space-y-4"
      >
        <p class="text-center text-gray-500">
          Êtes-vous sûr de vouloir supprimer le fichier suivant ?
        </p>
        <p class="text-center text-gray-700 dark:text-white">
          Nom: {{ uiStore.getUiModalData?.file.name }}
        </p>
        <div class="mt-5 sm:space-x-8 sm:mt-4 sm:flex sm:items-center sm:justify-center">
          <BaseButton
            color="red"
            :is-loading="uiStore.getUIIsLoading"
            @click="deleteFile"
          >
            Supprimer
          </BaseButton>
          <BaseButton @click="close">
            Annuler
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</BaseModal>
</template>

<script setup lang="ts">
import { ModalModeEnum } from '@/types'

interface Props {
  mode?: ModalModeEnum | null
  isActive: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  mode: null,
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
