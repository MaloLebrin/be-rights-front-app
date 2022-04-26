<template>
<div
  class="relative min-h-screen px-8 py-6 text-left transition-all duration-500 ease-in-out transform"
>
  <EventList
    :events="events"
    no-event-message="Aucun Event en Base de donnée"
  />
</div>
</template>

<script setup lang="ts">
import { EventStatusEnum } from '@/types/typesExported'

const eventStore = useEventStore()
const userStore = useUserStore()
const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
const { setSearch, setFilters } = useTableStore()
const tableStore = useTableStore()
const { fetchAllEvents } = eventHook()

const state = reactive({
  search: '',
  timeout: 0,
})

const events = computed(() => eventStore.getAllArray)

watch(() => tableStore.getFinalUrl, async newValue => {
  IncLoading()
  eventStore.resetState()
  await fetchAllEvents(newValue)
  DecLoading()
})

onMounted(async() => {
  if (userStore.getCurrentUserId) {
    IncLoading()
    await fetchAllEvents()
    DecLoading()
  }
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function searchEntity(event: KeyboardEvent) {
  clearTimeout(state.timeout)
  state.timeout = window.setTimeout(() => {
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
