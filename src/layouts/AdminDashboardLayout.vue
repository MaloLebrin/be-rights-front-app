<template>
<MenuDrawer />
<main
  v-bind="$attrs"
  class="w-full mx-auto dark:bg-blue-dark min-h-screen"
>
  <div class="md:container md:mx-auto">
    <Loader
      v-if="uiStore.getUIIsLoading"
      :is-loading="uiStore.getUIIsLoading"
    />
    <router-view
      v-show="!uiStore.getUIIsLoading"
      v-slot="{ Component }"
    >
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</main>
<Teleport to="#portal-target">
  <EventModal
    v-if="isModalActive(ModalNameEnum.EVENT_FORM).value"
    :is-active="isModalActive(ModalNameEnum.EVENT_FORM).value"
  />
  <EmployeeModal
    v-if="isModalActive(ModalNameEnum.ADD_EMPLOYEE).value"
    :is-active="isModalActive(ModalNameEnum.ADD_EMPLOYEE).value"
    :mode="getUiModalState.modalMode"
    :event-id="eventID"
    @close="CloseResetModalState"
    @onSubmit="CloseResetModalState"
  />
  <FileModal
    v-if="isModalActive(ModalNameEnum.FILE_MODAL).value"
    :is-active="isModalActive(ModalNameEnum.FILE_MODAL).value"
    :mode="getUiModalState.modalMode"
  />
  <AdminModalDeleteUser
    v-if="isModalActive(ModalNameEnum.USER_ADMIN).value"
    :is-active="isModalActive(ModalNameEnum.USER_ADMIN).value"
  />

  <Toast
    :variant="getUiToastState.variant"
    :is-toast-open="getUiToastState.isActive"
    :toast-duration="getUiToastState.duration"
    @close="resetUiToastState"
  >
    {{ getUiToastState.message }}
  </Toast>
</Teleport>
</template>

<script setup lang="ts">
import type { ModalNameEnum } from '@/types/typesExported'

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
