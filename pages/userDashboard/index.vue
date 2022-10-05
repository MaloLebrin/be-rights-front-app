<template>
<div
  class="relative min-h-screen py-6 text-left transition-all duration-500 ease-in-out transform"
>
  <EventsEventList
    :events="events"
  />
</div>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router'
import { useTableStore, useUiStore, useUserStore } from '~~/store'
import { useEventStore } from '~~/store/event'

const eventStore = useEventStore()
const { IncLoading, DecLoading } = useUiStore()
const userStore = useUserStore()
const tableStore = useTableStore()
const { setFilters } = tableStore

const { fetchEventsByUser, fetchAllEvents } = eventHook()

const events = computed(() => {
  if (userStore.getCurrentUserId) {
    return eventStore.getEventsByUserId(userStore.getCurrentUserId)
  }
  return []
})

onBeforeRouteLeave(() => {
  setFilters(null)
})

watch(() => tableStore.getFinalUrl, async newValue => {
  IncLoading()
  eventStore.resetState()
  await fetchAllEvents(newValue)
  DecLoading()
})

onMounted(async () => {
  if (userStore.getCurrentUserId) {
    IncLoading()
    await fetchEventsByUser(userStore.getCurrentUserId)
    DecLoading()
  }
})
</script>
