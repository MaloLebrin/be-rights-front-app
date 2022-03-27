<template>
  <BaseModal
    class="z-50 w-4/6 max-w-2xl mt-32 mx-72"
    title="Créer un événement"
    :isLoading="uiStore.getUIIsLoading"
    :isActive="isActive"
    :mode="getUiModalState.modalMode"
    @close="close"
  >
    <div
      v-if="getUiModalState.modalMode === ModalModeEnum.DELETE && uiStore.getUiModalData?.event"
      class="space-y-4"
    >
      <p
        class="text-center text-gray-500"
      >Êtes-vous sûr de vouloir supprimer le destinataire suivant ?</p>
      <p class="text-center text-gray-700">{{ uiStore.getUiModalData?.event.name }}</p>
      <div class="flex items-center justify-center space-x-4">
        <BaseButton color="red" @click="deleteEmployee">
          <div class="flex items-center">
            <TrashIconOutline class="w-4 h-4 mr-2" />
            <span>Supprimer</span>
          </div>
        </BaseButton>
        <BaseButton @click="close()">
          <div class="flex items-center">
            <XCircleIconOutline class="w-4 h-4 mr-2" />
            <span>Annuler</span>
          </div>
        </BaseButton>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ModalModeEnum } from '@/types/typesExported'

interface Props {
  isActive: boolean
}

withDefaults(defineProps<Props>(), {
  isActive: false,
})

const uiStore = useUiStore()
const { getUiModalState, resetUiModalState, IncLoading, DecLoading } = uiStore
const { deleteOne } = eventHook()

async function deleteEmployee() {
  if (uiStore.getUiModalData && uiStore.getUiModalData?.event) {
    IncLoading()
    await deleteOne(uiStore.getUiModalData.event.id)
    DecLoading()
  }
  close()
}

const emit = defineEmits<{
  (e: 'close'): void
}>()

function close() {
  emit('close')
  resetUiModalState()
}
</script>