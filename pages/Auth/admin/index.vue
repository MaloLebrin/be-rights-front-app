<template>
<div
  class="relative h-full px-4 py-6 text-left transition-all duration-500 ease-in-out transform"
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

onMounted(async () => {
  if (userStore.getCurrentUserId) {
    IncLoading()
    await fetchAllEvents()
    DecLoading()
  }
})

definePageMeta({
  layout: 'admin-dashboard-layout',
  middleware: ['nav-guard-middleware'],
  isAuth: true,
  isAdmin: true,
})
</script>
