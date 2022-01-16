<template>
  <MenuDrawer />
  <main v-bind="$attrs" class="text-center w-full">
    <router-view />
  </main>
  <Teleport to="#portal-target">
    <CreateEventModal
      v-if="getUiModalState.isActive && getUiModalState.modalName === ModalNameEnum.EVENT_FORM"
      class="top-32"
      :isActive="getUiModalState.isActive && getUiModalState.modalName === ModalNameEnum.EVENT_FORM"
      @close="resetUiModalState"
      @onSubmit="resetUiModalState"
    />
    <EmployeeModal
      v-if="getUiModalState.isActive && getUiModalState.modalName === ModalNameEnum.ADD_EMPLOYEE"
      :isActive="getUiModalState.isActive"
      :mode="getUiModalState.modalMode"
      :eventId="eventID"
      @close="resetUiModalState"
      @onSubmit="resetUiModalState"
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
</script>