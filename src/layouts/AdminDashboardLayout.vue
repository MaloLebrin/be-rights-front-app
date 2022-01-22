<template>
  <AdminMenuDrawer />
  <main v-bind="$attrs" class="flex-shrink w-full">
    <router-view />
  </main>
  <Teleport to="#portal-target">
    <EmployeeModal
      v-if="isModalActive(ModalNameEnum.ADD_EMPLOYEE).value"
      :isActive="isModalActive(ModalNameEnum.ADD_EMPLOYEE).value"
      :mode="getUiModalState.modalMode"
      :eventId="eventID"
      @close="CloseResetModalState"
      @onSubmit="CloseResetModalState"
    />
    <FileModal
      v-if="isModalActive(ModalNameEnum.FILE_MODAL).value"
      :isActive="isModalActive(ModalNameEnum.FILE_MODAL).value"
      :mode="getUiModalState.modalMode"
    />

    <Toast
      :variant="getUiToastState.variant"
      :isToastOpen="getUiToastState.isActive"
      :toastDuration="getUiToastState.duration"
      @close="resetUiToastState"
    >{{ getUiToastState.message }}</Toast>
  </Teleport>
</template>

<script setup lang="ts">
import { useEventStore, useUiStore } from "@/store"
import { ModalNameEnum } from "@/store/typesExported"

const { entities: eventsEntities } = useEventStore()
const uiStore = useUiStore()
const { getUiModalState, resetUiModalState, resetUiToastState, getUiToastState } = uiStore

const eventID = computed(() => {
  if (getUiModalState.data && getUiModalState.data.eventId) {
    return eventsEntities.byId[getUiModalState.data.eventId].id
  }
})


const isModalActive = (modalName: ModalNameEnum) => computed(() => getUiModalState.isActive && getUiModalState.modalName === modalName)

function CloseResetModalState() {
  resetUiModalState()
}
</script>