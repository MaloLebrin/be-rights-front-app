<template>
  <div class="relative mt-32">
    <Loader
      v-if="uiStore.getUIIsLoading"
      :isLoading="uiStore.getUIIsLoading"
      :type="LoaderTypeEnum.BOUNCE"
    />

    <div
      v-else-if="!uiStore.getUIIsLoading && events"
      v-for="(event, index) in events"
      :key="event.id"
      class="relative flex items-center"
    >
      <EventItem
        :event="event"
        :index="parseInt(index.toString())"
        @udpateOneItem="updateOneEvent(event)"
        @deleteOne="deleteOneEvent(event)"
        @addOne="addOneEmployeeToEvent(event.id)"
      />
    </div>
    <h4 v-else class="text-2xl font-semibold text-blue-dark dark:text-white">{{ NoEventMessage }}</h4>
  </div>
</template>

<script setup lang="ts">
import { useUiStore } from '@/store'
import { EventType, ModalModeEnum, ModalNameEnum } from '@/store/typesExported'
import { LoaderTypeEnum } from '@/types/globals'

const uiStore = useUiStore()
const { setUiModal } = uiStore

interface Props {
  NoEventMessage: string,
  events: EventType[],
}

withDefaults(defineProps<Props>(), {
  NoEventMessage: 'Aucun événement enregistré!',
  events: () => [],
})

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

function updateOneEvent(event: EventType) {
  setUiModal({
    isActive: true,
    modalName: ModalNameEnum.EVENT_FORM,
    modalMode: ModalModeEnum.EDIT,
    data: {
      event: event,
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