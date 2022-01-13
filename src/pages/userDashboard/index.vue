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
      <Loader v-if="isLoading" :isLoading="isLoading" :type="LoaderTypeEnum.BOUNCE" />
      <div
        v-else-if="!isLoading && events.length > 0"
        v-for="(event, index) in events"
        :key="event.id"
        class="flex items-center relative"
      >
        <EventItem :event="event" :index="index" @addOne="addOneEmployeeToEvent(event.id)" />
      </div>
      <h4
        v-else
        class="text-blue-dark dark:text-white font-semibold text-2xl"
      >Vous n'avez aucun événement</h4>
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
const { setUiModal } = useUiStore()
const { getCurrent } = useUserStore()
const { fetchEventsByUser } = eventHook()
const search = ref('')
const isLoading = ref(false)
const events = computed(() => getEventsByUserId(getCurrent!.id))

onMounted(async () => {
  isLoading.value = true
  await fetchEventsByUser(getCurrent!?.id)
  isLoading.value = false
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