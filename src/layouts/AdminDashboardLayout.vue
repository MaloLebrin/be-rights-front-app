<template>
<div class="flex">
  <MenuDrawer />
  <main
    v-bind="$attrs"
    class="w-full lg:pl-64 dark:bg-blue-dark"
  >
    <HeaderDashboard />
    <BaseLoader v-if="uiStore.getUIIsLoading" />
    <router-view
      v-show="!uiStore.getUIIsLoading"
      v-slot="{ Component }"
    >
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</div>

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
</Teleport>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ModalNameEnum } from '@/types'

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
