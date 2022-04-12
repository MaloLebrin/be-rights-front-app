<template>
  <MenuDrawer />
  <main v-bind="$attrs" class="relative w-full h-full bg-white dark:bg-blue-dark">
    <div class="md:container">
      <Loader v-if="uiStore.getUIIsLoading" :isLoading="uiStore.getUIIsLoading" />
      <router-view v-show="!uiStore.getUIIsLoading" v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </main>
  <Teleport to="#portal-target">
    <EventModal v-if="isModalActive(ModalNameEnum.EVENT_FORM).value"
      :isActive="isModalActive(ModalNameEnum.EVENT_FORM).value" />
    <EmployeeModal v-if="isModalActive(ModalNameEnum.ADD_EMPLOYEE).value"
      :isActive="isModalActive(ModalNameEnum.ADD_EMPLOYEE).value" :mode="getUiModalState.modalMode" :eventId="eventID"
      @close="CloseResetModalState" @onSubmit="CloseResetModalState" />
    <FileModal v-if="isModalActive(ModalNameEnum.FILE_MODAL).value"
      :isActive="isModalActive(ModalNameEnum.FILE_MODAL).value" :mode="getUiModalState.modalMode" />
    <AdminModalDeleteUser v-if="isModalActive(ModalNameEnum.USER_ADMIN).value"
      :isActive="isModalActive(ModalNameEnum.USER_ADMIN).value" />
    <Modale>
      <div class="sm:flex sm:items-start">
        <div
          class="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationIconOutline class="w-6 h-6 text-red-600" aria-hidden="true" />
        </div>
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900"> Deactivate account
          </DialogTitle>
          <div class="mt-2">
            <p class="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data
              will be permanently removed from our servers forever. This action cannot be undone.</p>
          </div>
        </div>
      </div>
      <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button type="button"
          class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          @click="open = false">Deactivate</button>
        <button type="button"
          class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          @click="open = false" ref="cancelButtonRef">Cancel</button>
      </div>
    </Modale>


    <Toast :variant="getUiToastState.variant" :isToastOpen="getUiToastState.isActive"
      :toastDuration="getUiToastState.duration" @close="resetUiToastState">{{ getUiToastState.message }}</Toast>
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