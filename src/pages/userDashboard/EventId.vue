<template>
  <div
    class="min-h-screen py-6 pr-8 text-left transition-all duration-500 ease-in-out transform pl-14"
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
const eventStore = useEventStore()

const event = computed(() => eventStore.getOne(eventStore.getFirstActive))
</script>
