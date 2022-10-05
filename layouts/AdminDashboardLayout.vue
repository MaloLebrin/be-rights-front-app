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
    v-if="isModalActive(ModalNameEnum.EVENT_FORM).value"
    :is-active="isModalActive(ModalNameEnum.EVENT_FORM).value"
  />
  <ModalsEmployeeModal
    v-if="isModalActive(ModalNameEnum.ADD_EMPLOYEE).value"
    :is-active="isModalActive(ModalNameEnum.ADD_EMPLOYEE).value"
    :mode="getUiModalState.modalMode"
    :event-id="eventID"
    @close="CloseResetModalState"
    @onSubmit="CloseResetModalState"
  />
  <FilesFileModal
    v-if="isModalActive(ModalNameEnum.FILE_MODAL).value"
    :is-active="isModalActive(ModalNameEnum.FILE_MODAL).value"
    :mode="getUiModalState.modalMode"
  />
  <ModalsAdminModalDeleteUser
    v-if="isModalActive(ModalNameEnum.USER_ADMIN).value"
    :is-active="isModalActive(ModalNameEnum.USER_ADMIN).value"
  />
</Teleport>
</template>

<script setup lang="ts">
import { ModalNameEnum } from '@/types'
import { useUiStore } from '~~/store'
import { useEventStore } from '~~/store/event'

const { entities: eventsEntities } = useEventStore()
const uiStore = useUiStore()
const { getUiModalState, resetUiModalState } = uiStore

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
