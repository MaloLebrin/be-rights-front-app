<template>
  <div
    class="container relative min-h-screen py-6 pr-8 mx-auto text-left transition-all duration-500 ease-in-out transform"
  >
    <HeaderList>
      <template #title>
        <CalendarIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />
        {{ event.name }}
      </template>
    </HeaderList>
    <div class="py-4 mt-24 rounded-lg shadow-lg">
      <EventForm :event-id="eventStore.getFirstActive" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router'

const eventStore = useEventStore()
const { resetActive } = eventStore

onBeforeRouteLeave(() => {
  resetActive()
})

const event = computed(() => eventStore.getOne(eventStore.getFirstActive))

</script>

<route>
{meta: {
  layout: "AdminDashboardLayout",
}
}
</route>
