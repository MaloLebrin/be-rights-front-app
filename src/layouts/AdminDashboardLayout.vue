<template>
  <AdminMenuDrawer />
  <main v-bind="$attrs" class="w-full flex-shrink">
    <router-view />
  </main>
  <Teleport to="#portal-target">
    <CreateEventModal
      v-if="getUIState.isActive && getUIState.modalName === ModalNameEnum.EVENT_FORM"
      class="top-32"
      :isActive="getUIState.isActive && getUIState.modalName === ModalNameEnum.EVENT_FORM"
    />
    <AddEmployeeModal
      v-if="getUIState.isActive && getUIState.modalName === ModalNameEnum.ADD_EMPLOYEE"
      :isActive="getUIState.isActive"
      :mode="getUIState.modalMode"
      :eventId="eventID"
      @close="resetUIState"
      @onSubmit="resetUIState"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { useEventStore, useUiStore } from "@/store"
import { ModalNameEnum } from "@/store/typesExported"

const eventStore = useEventStore()
const uiStore = useUiStore()
const { getUiIsLoading, getUIState, resetUIState } = uiStore
const eventID = computed(() => {
  if (getUIState.data && getUIState.data.eventId) {
    return eventStore.entities.byId[getUIState.data.eventId].id
  }
})


</script>