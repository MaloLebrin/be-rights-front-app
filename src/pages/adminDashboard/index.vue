<template>
  <div
    class="relative min-h-screen py-6 pr-8 text-left transition-all duration-500 ease-in-out transform dark:bg-blue-dark pl-14"
  >
    <HeaderList>
      <template #title>
        <HomeIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />Événements
      </template>
      <template #additionnalButtons>
        <BButton class="mr-2 dark:text-black" @click="setHeaderFilters(null)">Tout</BButton>
        <BButton
          class="mr-2 dark:text-black"
          @click="setHeaderFilters(EventStatusEnum.PENDING)"
        >En cours</BButton>
        <BButton
          class="mr-2 dark:text-black"
          @click="setHeaderFilters(EventStatusEnum.CLOSED)"
        >Terminés</BButton>
        <BInput
          v-model="state.search"
          type="text"
          placeholder="Recherchez"
          @keyup="searchEntity($event)"
        />
      </template>
    </HeaderList>
    <EventList :events="events" NoEventMessage="Aucun Event en Base de donnée" />
  </div>
</template>

<script setup lang="ts">
import { useEventStore, useTablestore, useUiStore, useUserStore } from '@/store/index'
import { EventStatusEnum } from '@/types/typesExported'

const eventStore = useEventStore()
const userStore = useUserStore()
const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
const { setSearch, setFilters } = useTablestore()
const tableStore = useTablestore()
const { fetchAllEvents } = eventHook()

const state = reactive({
  search: '',
  timeout: 0,
})

const events = computed(() => eventStore.getAllArray)

watch(() => tableStore.getFinalUrl, async (newValue) => {
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

function searchEntity(event: KeyboardEvent) {
  clearTimeout(state.timeout)
  state.timeout = setTimeout(() => {
    setSearch(state.search)
  }, 500)
}

function setHeaderFilters(filter: string | null) {
  if (filter) {
    setFilters({
      status: filter,
    })
  } else {
    setFilters(null)
  }
}
</script>

<route>
{meta: {
  layout: "AdminDashboardLayout"
}
}
</route>

