<template>
<div class="relative">
  <template v-if="events.length > 0">
    <div
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
  </template>
  <h4
    v-else
    class="text-2xl font-semibold text-blue-dark dark:text-white"
  >
    {{ noEventMessage }}
  </h4>
</div>
</template>

<script setup lang="ts">
import type { EventType } from '@/types/typesExported'
import { ModalModeEnum, ModalNameEnum } from '@/types/typesExported'

const uiStore = useUiStore()
const { setUiModal } = uiStore
const userStore = useUserStore()
const router = useRouter()

interface Props {
  noEventMessage: string
  events: EventType[]
}

withDefaults(defineProps<Props>(), {
  noEventMessage: 'Aucun événement enregistré!',
  events: () => [],
})

function updateOneEvent(eventId: number) {
  if (userStore.isCurrentUserAdmin) {
    router.push({ name: 'admin.events.show', params: { eventId } })
  } else {
    router.push({ name: 'user.events.show', params: { eventId } })
  }
}

function addOneEmployeeToEvent(eventId: number) {
  setUiModal({
    isActive: true,
    modalName: ModalNameEnum.ADD_EMPLOYEE,
    modalMode: ModalModeEnum.CREATE,
    data: {
      eventId,
    },
  })
}

function deleteOneEvent(event: EventType) {
  setUiModal({
    isActive: true,
    modalName: ModalNameEnum.EVENT_FORM,
    modalMode: ModalModeEnum.DELETE,
    data: {
      event,
    },
  })
}
</script>
