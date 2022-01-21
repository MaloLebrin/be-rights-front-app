<template>
  <div
    class="relative min-h-screen py-6 pr-8 text-left transition-all duration-500 ease-in-out transform bg-white-light dark:bg-blue-dark pl-14"
  >
    <HeaderList>
      <template #title>
        <HomeIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />Événements
      </template>
    </HeaderList>
    <EventList :events="events" NoEventMessage="Aucun Event en Base de donnée" />
  </div>
</template>
<route>
{meta: {
  layout: "AdminDashboardLayout"
}
}
</route>

<script setup lang="ts">
import { useEventStore, useUiStore, useUserStore } from '@/store/index'
import { eventHook } from '@/hooks'

const eventStore = useEventStore()
const userStore = useUserStore()
const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
const { fetchAllEvents } = eventHook()
const search = ref('')

const events = computed(() => eventStore.getAllArray)

onMounted(async () => {
  if (userStore.getCurrentUserId) {
    IncLoading()
    await fetchAllEvents()
    DecLoading()
  }
})
</script>