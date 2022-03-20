<template>
  <BaseModal
    class="z-50 w-4/6 max-w-2xl mt-32 mx-72"
    title="Créer un destinataire"
    :isLoading="uiStore.getUIIsLoading"
    :isActive="isActive"
    @close="close"
  ></BaseModal>
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

withDefaults(defineProps<Props>(), {
  isActive: false,
  employee: undefined,
  mode: undefined,
  eventId: undefined,
  userId: undefined,
})

const uiStore = useUiStore()

</script>