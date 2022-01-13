<template>
  <div
    class="bg-white-light dark:bg-blue-dark min-h-screen transform ease-in-out transition-all duration-500 py-6 text-left pl-14 pr-8 relative"
  >
    <HeaderList>
      <template #title>
        <HomeIconOutline class="h-8 mr-4 dark:bg-red rounded-lg p-1" />Événements
      </template>
    </HeaderList>
    <div class="relative mt-32">
      <Loader
        v-if="uiStore.getUIIsLoading"
        :isLoading="uiStore.getUIIsLoading"
        :type="LoaderTypeEnum.BOUNCE"
      />
      <div
        v-else
        v-for="(event, index) in events"
        :key="event.id"
        class="flex items-center relative"
      >
        <EventItem :event="event" :index="index" @addOne="addOneEmployeeToEvent(event.id)" />
      </div>
    </div>
  </div>
</template>
<route>
{meta: {
  layout: "AdminDashboardLayout"
}
}
</route>

<script setup lang="ts">
import { useEventStore, useUiStore } from '@/store/index'
import { LoaderTypeEnum } from '@/types/globals'
import { eventHook } from '@/hooks'
import { ModalNameEnum, ModalModeEnum } from '@/store/typesExported'

const eventStore = useEventStore()
const uiStore = useUiStore()
const { setUiModal, IncLoading, DecLoading } = uiStore
const { fetchAllEvents } = eventHook()
const search = ref('')

const events = computed(() => Object.values(eventStore.entities.byId))

onMounted(async () => {
  IncLoading()
  await fetchAllEvents()
  DecLoading()
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