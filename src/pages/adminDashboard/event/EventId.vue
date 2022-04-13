<template>
  <div
    class="container min-h-screen px-8 py-6 text-left transition-all duration-500 ease-in-out transform md:px-20 lg:px-32">
    <HeaderList>
      <template #title>
        <CalendarIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />
        {{ event.name }}
      </template>
    </HeaderList>
    <div class="py-4 mt-24 rounded-lg shadow-lg">
      <EventForm :event-id="eventId" :mode="ModalModeEnum.EDIT" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalModeEnum } from '@/types/typesExported'
const eventStore = useEventStore()
const { params } = useRoute()

const eventId = computed(() => parseInt(params.eventId as string))
const event = computed(() => eventStore.getOne(eventId.value))
</script>
