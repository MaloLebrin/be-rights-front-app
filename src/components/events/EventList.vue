<template>
  <div class="relative mt-32">
    <div
      v-if="events.length > 0"
      v-for="(event, index) in events"
      :key="event.id"
      class="relative flex items-center"
    >
      <EventItem
        :event="event"
        :index="parseInt(index.toString())"
        @udpateOneItem="updateOneEvent(event.id)"
        @deleteOne="deleteOneEvent(event)"
        @addOne="addOneEmployeeToEvent(event.id)"
      />
    </div>
    <h4 v-else class="text-2xl font-semibold text-blue-dark dark:text-white">{{ NoEventMessage }}</h4>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { EventType, ModalModeEnum, ModalNameEnum } from '@/types/typesExported'

const uiStore = useUiStore()
const { setUiModal } = uiStore
const eventStore = useEventStore()
const { setActive } = eventStore

interface Props {
  NoEventMessage: string,
  events: EventType[],
}

withDefaults(defineProps<Props>(), {
  NoEventMessage: 'Aucun événement enregistré!',
  events: () => [],
})

function updateOneEvent(eventId: number) {
  router.push('/admindashboard/eventid')
  setActive(eventId)
}

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

function deleteOneEvent(event: EventType) {
  setUiModal({
    isActive: true,
    modalName: ModalNameEnum.EVENT_FORM,
    modalMode: ModalModeEnum.DELETE,
    data: {
      event: event,
    }
  })
}
</script>