<template>
<div
  class="relative min-h-screen py-6 text-left transition-all duration-500 ease-in-out transform"
>
  <EventList
    :events="events"
  />
</div>
</template>

<script setup lang="ts">
const eventStore = useEventStore()
const { IncLoading, DecLoading } = useUiStore()
const userStore = useUserStore()
const tableStore = useTableStore()

const { fetchEventsByUser, fetchAllEvents } = eventHook()

const events = computed(() => {
  if (userStore.getCurrentUserId) {
    return eventStore.getEventsByUserId(userStore.getCurrentUserId)
  }
  return []
})

watch(() => tableStore.getFinalUrl, async newValue => {
  IncLoading()
  eventStore.resetState()
  await fetchAllEvents(newValue)
  DecLoading()
})

onMounted(async() => {
  if (userStore.getCurrentUserId) {
    IncLoading()
    await fetchEventsByUser(userStore.getCurrentUserId)
    DecLoading()
  }
})
</script>
