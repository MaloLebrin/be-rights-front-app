<template>
<MenuDrawer />
<main
  v-bind="$attrs"
  class="w-full min-h-screen mx-auto dark:bg-blue-dark"
>
  <div class="w-full md:container md:mx-auto">
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
    v-if="getUiModalState.isActive && getUiModalState.modalName === ModalNameEnum.EVENT_FORM"
    class="top-32"
    :is-active="getUiModalState.isActive && getUiModalState.modalName === ModalNameEnum.EVENT_FORM"
    @close="CloseResetModalState"
    @onSubmit="CloseResetModalState"
  />
  <EmployeeModal
    v-if="getUiModalState.isActive && getUiModalState.modalName === ModalNameEnum.ADD_EMPLOYEE"
    :is-active="getUiModalState.isActive"
    :mode="getUiModalState.modalMode"
    :event-id="eventID"
    @close="CloseResetModalState"
    @onSubmit="CloseResetModalState"
  />
  <FileModal
    v-if="getUiModalState.isActive && getUiModalState.modalName === ModalNameEnum.FILE_MODAL"
    :is-active="getUiModalState.isActive"
    :mode="getUiModalState.modalMode"
  />

  <Toast
    :variant="getUiToastState.variant"
    :is-toast-open="getUiToastState.isActive"
    :toast-duration="getUiToastState.duration"
    @close="resetUiToastState"
  >
    {{ getUiToastState.message }}
  </Toast>
  <CookiesModal />
</Teleport>
</template>

<script setup lang="ts">
import { ModalNameEnum } from '@/types/typesExported'

const { entities: eventsEntities } = useEventStore()
const { getUiModalState, resetUiModalState, resetUiToastState, getUiToastState } = useUiStore()
const uiStore = useUiStore()

const eventID = computed(() => {
  if (getUiModalState.data && getUiModalState.data.eventId) {
    return eventsEntities.byId[getUiModalState.data.eventId].id
  }
})

function CloseResetModalState() {
  resetUiModalState()
}
</script>
