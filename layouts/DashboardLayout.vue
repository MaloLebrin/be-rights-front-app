<template>
<div class="flex">
  <DrawerMenuDrawer />
  <main
    v-bind="$attrs"
    class="w-full lg:pl-64 dark:bg-blue-dark"
  >
    <HeaderDashboard />
    <BaseLoader v-if="uiStore.getUIIsLoading" />
    <NuxtPage
      v-show="!uiStore.getUIIsLoading"
      v-slot="{ Component }"
    >
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </NuxtPage>
  </main>
</div>

<Teleport to="#portal-target">
  <ModalsEventModal
    v-if="getUiModalState.isActive && getUiModalState.modalName === ModalNameEnum.EVENT_FORM"
    class="top-32"
    :is-active="getUiModalState.isActive && getUiModalState.modalName === ModalNameEnum.EVENT_FORM"
    @close="CloseResetModalState"
    @onSubmit="CloseResetModalState"
  />
  <ModalsEmployeeModal
    v-if="getUiModalState.isActive && getUiModalState.modalName === ModalNameEnum.ADD_EMPLOYEE"
    :is-active="getUiModalState.isActive"
    :mode="getUiModalState.modalMode"
    :event-id="eventID"
    @close="CloseResetModalState"
    @onSubmit="CloseResetModalState"
  />
  <FilesFileModal
    v-if="getUiModalState.isActive && getUiModalState.modalName === ModalNameEnum.FILE_MODAL"
    :is-active="getUiModalState.isActive"
    :mode="getUiModalState.modalMode"
  />

  <ModalsCookiesModal />
</Teleport>
</template>

<script setup lang="ts">
import { ModalNameEnum } from '@/types'
import { useUiStore } from '~~/store'
import { useEventStore } from '~~/store/event'

const { entities: eventsEntities } = useEventStore()
const { getUiModalState, resetUiModalState } = useUiStore()
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
