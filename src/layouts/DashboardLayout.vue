<template>
  <MenuDrawer />
  <main v-bind="$attrs" class="w-full text-center">
    <router-view />
  </main>
  <Teleport to="#portal-target">
    <EventModal
      v-if="getUiModalState.isActive && getUiModalState.modalName === ModalNameEnum.EVENT_FORM"
      class="top-32"
      :isActive="getUiModalState.isActive && getUiModalState.modalName === ModalNameEnum.EVENT_FORM"
      @close="CloseResetModalState"
      @onSubmit="CloseResetModalState"
    />
    <EmployeeModal
      v-if="getUiModalState.isActive && getUiModalState.modalName === ModalNameEnum.ADD_EMPLOYEE"
      :isActive="getUiModalState.isActive"
      :mode="getUiModalState.modalMode"
      :eventId="eventID"
      @close="CloseResetModalState"
      @onSubmit="CloseResetModalState"
    />
    <FileModal
      v-if="getUiModalState.isActive && getUiModalState.modalName === ModalNameEnum.FILE_MODAL"
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
const { getUiModalState, resetUiModalState, resetUiToastState, getUiToastState } = useUiStore()

const eventID = computed(() => {
  if (getUiModalState.data && getUiModalState.data.eventId) {
    return eventsEntities.byId[getUiModalState.data.eventId].id
  }
})

function CloseResetModalState() {
  resetUiModalState()
}
</script>