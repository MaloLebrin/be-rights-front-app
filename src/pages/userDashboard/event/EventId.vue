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
      <EventForm :mode="ModalModeEnum.EDIT" :event-id="eventId" @submitted="redirectToEvent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalModeEnum } from '@/types/typesExported'

const eventStore = useEventStore()
const { params } = useRoute()
const router = useRouter()
const eventId = computed(() => parseInt(params.eventId as string))
const event = computed(() => eventStore.getOne(eventId.value))

function redirectToEvent() {
  router.push({ name: 'user.events' })
}
</script>
