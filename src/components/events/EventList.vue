<template>
<div class="h-full px-4 sm:px-6 lg:px-8">
  <div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
      <BaseInput
        v-model="state.search"
        type="text"
        placeholder="Recherchez"
        @keyup="searchEntity($event)"
      />
    </div>
    <div class="flex items-center mt-4 sm:mt-0 sm:ml-16">
      <BaseButton
        class="mr-2 dark:text-black"
        @click="setHeaderFilters(null)"
      >
        Tout
      </BaseButton>
      <BaseButton
        class="mr-2 dark:text-black"
        @click="setHeaderFilters(EventStatusEnum.PENDING)"
      >
        En cours
      </BaseButton>
      <BaseButton
        class="mr-2 dark:text-black"
        @click="setHeaderFilters(EventStatusEnum.CLOSED)"
      >
        Terminés
      </BaseButton>
    </div>
  </div>
  <div class="flex flex-col h-full mt-8">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <HeaderEventTable />
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <template v-if="events.length > 0">
                <EventItem
                  v-for="event in events"
                  :key="event.id"
                  :event="event"
                />
              </template>
              <p
                v-else
                class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 truncate whitespace-nowrap sm:pl-6"
              >
                {{ noEventMessage }}
              </p>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import type { EventType } from '@/types/typesExported'
import { EventStatusEnum } from '@/types/typesExported'

interface Props {
  noEventMessage: string
  events: EventType[]
}

withDefaults(defineProps<Props>(), {
  noEventMessage: 'Aucun événement enregistré!',
  events: () => [],
})

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
