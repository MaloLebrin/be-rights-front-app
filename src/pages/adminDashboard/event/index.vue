<template>
<div
  class="relative h-full px-4 py-6 text-left transition-all duration-500 ease-in-out transform"
>
  <EventList
    :events="events"
    no-event-message="Aucun Event en Base de donnée"
  />
</div>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router'

const tableStore = useTableStore()
const { setFilters } = tableStore
const { IncLoading, DecLoading } = useUiStore()
const eventStore = useEventStore()
const userStore = useUserStore()

const { fetchAllEvents } = eventHook()

onBeforeRouteLeave(() => {
  setFilters(null)
})

const events = computed(() => eventStore.getAllArray)

watch(() => tableStore.getFinalUrl, async newValue => {
  IncLoading()
  eventStore.resetState()
  await fetchAllEvents(newValue)
  DecLoading()
})

onMounted(async() => {
  if (userStore.getCurrentUserId) {
    IncLoading()
    await fetchAllEvents()
    DecLoading()
  }
})
</script>
