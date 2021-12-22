<template>
  <div
    class="bg-white-light dark:bg-blue-dark min-h-screen transform ease-in-out transition-all duration-500 py-6 text-left pl-14 pr-8 relative"
  >
    <div class="grid grid-cols-3 items-center mb-14">
      <h3
        class="text-2xl font-semibold text-gray-800 dark:text-white flex items-center max-w-xs mt"
      >
        <HomeIcon class="h-8 mr-4 dark:bg-red rounded-lg p-1" />Événements
      </h3>
      <div class="flex col-span-2 items-center justify-center">
        <BButton class="mr-2 dark:text-black">Tout</BButton>
        <BButton class="mr-2 dark:text-black">En cours</BButton>
        <BButton class="mr-2 dark:text-black">À venir</BButton>
        <BButton class="mr-2 dark:text-black">Terminés</BButton>
        <BInput type="text" placeholder="Recherchez" v-model="search" />
      </div>
    </div>
    <div class="relative">
      <Loader v-if="isLoading" :isLoading="isLoading" :type="LoaderTypeEnum.BOUNCE" />
      <div
        v-else
        v-for="(event, index) in events"
        :key="event.id"
        class="flex items-center relative"
      >
        <EventItem :event="event" :index="index" @addOne="addOneEmployeeToEvent(event.id)" />
      </div>
      <AddEmployeeModal
        v-if="getUIState.isActive && getUIState.modalName === ModalNameEnum.ADD_EMPLOYEE"
        :isActive="getUIState.isActive"
        :mode="getUIState.modalMode"
        :eventId="events.filter(event => event.id === getUIState.data.eventId)[0].id"
        @close="resetState"
        @onSubmit="resetState"
      />
    </div>
  </div>
</template>
<route>
{meta: {
  layout: "AdminDashboardLayout"
}
}
</route>

<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/outline'
import { computed, ref, onMounted, reactive } from 'vue'
import { useEventStore, useUiStore } from '@/store/index'
import { LoaderTypeEnum } from '@/types/globals'
import { eventHook } from '@/hooks'
import { ModalNameEnum, ModalModeEnum } from '@/store/typesExported'

const eventStore = useEventStore()
const uiStore = useUiStore()
const { getUIState, resetUIState, setUiModal } = uiStore
const { fetchAllEvents } = eventHook()
const search = ref('')
const isLoading = ref(false)
const events = computed(() => Object.values(eventStore.entities.byId))

onMounted(async () => {
  isLoading.value = true
  await fetchAllEvents()
  isLoading.value = false
})

function resetState() {
  resetUIState()
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
</script>