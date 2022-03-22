<template>
  <BaseModal
    class="z-50 w-4/6 max-w-2xl mt-32 mx-72"
    :title="getModalTitle"
    :isLoading="uiStore.getUIIsLoading"
    :isActive="isActive"
    @close="close"
  >
    <EmployeeForm
      v-if="mode === ModalModeEnum.EDIT || mode === ModalModeEnum.CREATE"
      :mode="mode"
      :employee="uiStore.getUiModalData?.employee"
      :eventId="eventId"
      :userId="userId"
      @submit="onSubmit"
    />
    <div v-else-if="mode === ModalModeEnum.DELETE" class="space-y-4">
      <p
        class="text-center text-gray-500"
      >Êtes-vous sûr de vouloir supprimer le destinataire suivant ?</p>
      <p
        class="text-center text-gray-700"
      >{{ uiStore.getUiModalData?.employee.firstName }} {{ uiStore.getUiModalData?.employee.lastName }}</p>
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