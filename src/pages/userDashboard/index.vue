<template>
  <div
    class="relative min-h-screen py-6 pr-8 text-left transition-all duration-500 ease-in-out transform bg-white-light dark:bg-blue-dark pl-14"
  >
    <HeaderList>
      <template #title>
        <HomeIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />Événements
      </template>
    </HeaderList>
    <div class="relative mt-32">
      <Loader
        v-if="uiStore.getUIIsLoading"
        :isLoading="uiStore.getUIIsLoading"
        :type="LoaderTypeEnum.BOUNCE"
      />
      <div
        v-else-if="!uiStore.getUIIsLoading && events.length > 0"
        v-for="(event, index) in events"
        :key="event.id"
        class="relative flex items-center"
      >
        <EventItem :event="event" :index="index" @addOne="addOneEmployeeToEvent(event.id)" />
      </div>
      <h4
        v-else
        class="text-2xl font-semibold text-blue-dark dark:text-white"
      >Vous n'avez aucun événement !</h4>
    </div>
  </div>
</template>

<route>
{meta: {
  layout: "DashboardLayout"
}
}
</route>

<script setup lang="ts">
import { useEventStore, useUiStore, useUserStore } from '@/store/index'
import { LoaderTypeEnum } from '@/types/globals'
import { eventHook } from '@/hooks'
import { ModalNameEnum, ModalModeEnum } from '@/store/typesExported'

const { getEventsByUserId } = useEventStore()
const { setUiModal, IncLoading, DecLoading } = useUiStore()
const uiStore = useUiStore()
const userStore = useUserStore()
const { fetchEventsByUser } = eventHook()
const search = ref('')

const events = computed(() => {
  if (userStore.getCurrentUserId) {
    return getEventsByUserId(userStore.getCurrentUserId)
  }
  return []
})

onMounted(async () => {
  if (userStore.getCurrentUserId) {
    IncLoading()
    await fetchEventsByUser(userStore.getCurrentUserId)
    DecLoading()
  }
})

function addOneEmployeeToEvent(eventId: number) {
  setUiModal({
    isActive: true,
    modalName: ModalNameEnum.ADD_EMPLOYEE,
    modalMode: ModalModeEnum.CREATE,
    data: {
      eventId: eventId,
    }
  })
}

</script>