<template>
  <AdminMenuDrawer />
  <main v-bind="$attrs" class="flex-shrink w-full">
    <router-view />
  </main>
  <Teleport to="#portal-target">
    <EventModal
      v-if="isModalActive(ModalNameEnum.EVENT_FORM)"
      class="top-32"
      :isActive="getUiModalState.isActive"
      @close="CloseResetModalState"
      @onSubmit="CloseResetModalState"
    />
    <EmployeeModal
      v-if="isModalActive(ModalNameEnum.ADD_EMPLOYEE)"
      :isActive="getUiModalState.isActive"
      :mode="getUiModalState.modalMode"
      :eventId="eventID"
      @close="CloseResetModalState"
      @onSubmit="CloseResetModalState"
    />
    <FileModal
      v-if="isModalActive(ModalNameEnum.FILE_MODAL)"
      :isActive="getUiModalState.isActive"
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