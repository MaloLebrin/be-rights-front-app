<template>
  <Modale :isActive="isActive" @close="close">
    <div class="px-4 py-2 sm:flex sm:items-start">
      <div v-if="mode === ModalModeEnum.DELETE"
        class="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
        <ExclamationIconOutline class="w-6 h-6 text-red-600" aria-hidden="true" />
      </div>
      <div class="mt-3 space-y-2 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
          {{ getModalTitle }}
        </DialogTitle>

        <div v-if="mode === ModalModeEnum.EDIT || mode === ModalModeEnum.CREATE"
          class="flex items-center justify-center">
          <EmployeeForm :mode="mode" :employee="uiStore.getUiModalData?.employee" :eventId="eventId" :userId="userId"
            @submit="onSubmit" />
        </div>
        <div v-else-if="mode === ModalModeEnum.DELETE" class="mt-2 space-y-4">
          <p class="text-sm text-gray-500">Êtes-vous sûr de vouloir supprimer ce destinataire ? Toutes ses données
            seront définitivement supprimés de nos serveurs pour toujours. Cette action ne peut pas être annulée.</p>
          <div class="mt-5 sm:space-x-8 sm:mt-4 sm:flex sm:items-center sm:justify-center">
            <BaseButton color="red" :isLoading="uiStore.getUIIsLoading" @click="deleteEmployee">Supprimer</BaseButton>
            <BaseButton @click="close">Annuler</BaseButton>
          </div>
        </div>
      </div>
    </div>
  </Modale>
</template>

<script setup lang="ts">
import { EmployeeType, ModalModeEnum } from '@/types/typesExported'

interface Props {
  mode?: ModalModeEnum
  isActive: boolean
  employee?: EmployeeType
  eventId?: number
  userId?: number
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  employee: undefined,
  mode: undefined,
  eventId: undefined,
  userId: undefined,
})

const uiStore = useUiStore()
const { IncLoading, DecLoading, resetUiModalState } = uiStore
const { deleteOne } = employeeHook()

async function deleteEmployee() {
  if (uiStore.getUiModalState && uiStore.getUiModalData?.employee) {
    IncLoading()
    const id = uiStore.getUiModalData.employee.id
    if (id) {
      await deleteOne(id)
    }
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
      return 'Créer un destinataire'

    case ModalModeEnum.EDIT:
      return 'Modifier un destinataire'

    case ModalModeEnum.DELETE:
      return 'Supprimer un destinataire'

    default:
      return 'Créer un destinataire'
  }
})
</script>