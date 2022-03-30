<template>
  <AdminMenuDrawer />
  <main v-bind="$attrs" class="relative w-full h-full dark:bg-blue-dark">
    <div class="w-full md:container">
      <Loader v-if="uiStore.getUIIsLoading" :isLoading="uiStore.getUIIsLoading" />
      <router-view v-show="!uiStore.getUIIsLoading" v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </main>
  <Teleport to="#portal-target">
    <EventModal
      v-if="isModalActive(ModalNameEnum.EVENT_FORM).value"
      :isActive="isModalActive(ModalNameEnum.EVENT_FORM).value"
    />
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
    <UsersAdminModal
      v-if="isModalActive(ModalNameEnum.USER_ADMIN).value"
      :isActive="isModalActive(ModalNameEnum.USER_ADMIN).value"
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
import { ModalNameEnum } from "@/types/typesExported"

const { entities: eventsEntities } = useEventStore()
const uiStore = useUiStore()
const { getUiModalState, resetUiModalState, resetUiToastState, getUiToastState } = uiStore

const eventID = computed(() => {
  if (getUiModalState.data && getUiModalState.data.eventId) {
    return eventsEntities.byId[getUiModalState.data.eventId].id
  }
})

const isModalActive = (modalName: ModalNameEnum) => computed(() => getUiModalState.isActive && getUiModalState.modalName === modalName && !getUiModalState.isLoading)

function CloseResetModalState() {
  resetUiModalState()
}
</script>