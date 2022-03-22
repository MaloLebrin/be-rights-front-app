<template>
  <div
    class="relative min-h-screen py-6 text-left transition-all duration-500 ease-in-out transform dark:bg-blue-dark"
  >
    <HeaderList>
      <template #title>
        <HomeIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />Événements
      </template>
      <template #additionnalButtons>
        <BaseButton @click="setHeaderFilters(null)">Tout</BaseButton>
        <BaseButton @click="setHeaderFilters(EventStatusEnum.PENDING)">En cours</BaseButton>
        <BaseButton @click="setHeaderFilters(EventStatusEnum.CLOSED)">Terminés</BaseButton>
        <BaseInput
          v-model="state.search"
          type="text"
          placeholder="Recherchez"
          @keyup="searchEntity($event)"
        />
        <BLink
          tag="router-link"
          to="/userDashboard/bugReports/BugReport"
          variant="danger"
          class="flex items-center space-x-2 dark:text-black"
        >
          <ExclamationIconOutline class="w-6 h-8 dark:bg-red" />
          <span>Signaler un bug</span>
        </BLink>
      </template>
    </HeaderList>
    <EventList :events="events" NoEventMessage="Aucun Event en Base de donnée" />
  </div>
</template>

<script setup lang="ts">
import { EventStatusEnum } from '@/types/typesExported'

const { getEventsByUserId } = useEventStore()
const { IncLoading, DecLoading } = useUiStore()
const userStore = useUserStore()
const { setSearch, setFilters } = useTableStore()

const { fetchEventsByUser } = eventHook()

const state = reactive<{
  search: string
  timeout: number
}>({
  search: '',
  timeout: 0,
})

const events = computed(() => {
  if (userStore.getCurrentUserId) {
    return getEventsByUserId(userStore.getCurrentUserId)
  }
  return []
})

onMounted(async () => {
  if (userStore.getCurrentUserId) {
    IncLoading()
    await fetchEventsByUser(userStore.getCurrentUserId)
    DecLoading()
  }
})

function setHeaderFilters(filter: string | null) {
  if (filter) {
    setFilters({
      status: filter,
      createdByUser: userStore.getCurrentUserId!.toString(),
    })
  } else {
    setFilters(null)
  }
}

function searchEntity(event: KeyboardEvent) {
  clearTimeout(state.timeout)
  state.timeout = window.setTimeout(() => {
    setSearch(state.search)
  }, 500)
}
</script>

<route>
{
  meta: {
    layout: "DashboardLayout",
    isAuth: true,
  }
}
</route>
