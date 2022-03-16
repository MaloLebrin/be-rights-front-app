<template>
  <div
    class="container relative min-h-screen py-6 pr-8 mx-auto text-left transition-all duration-500 ease-in-out transform dark:bg-blue-dark pl-14"
  >
    <HeaderList>
      <template #title>
        <UsersIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />Bugs
      </template>
      <template #additionnalButtons>
        <BInput
          class="ml-12"
          v-model="state.search"
          type="text"
          placeholder="Recherchez"
          @keyup="searchEntity($event)"
        />
      </template>
    </HeaderList>
    <BugList :bugs="bugs" />
  </div>
</template>

<script setup lang="ts">
import { useBugStore, useTablestore, useUiStore } from '@/store'

const tableStore = useTablestore()
const { setSearch } = tableStore
const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
const bugsStore = useBugStore()

const { fetchAll } = bugReportsHook()

const state = reactive({
  search: '',
  timeout: 0,
})

const bugs = computed(() => bugsStore.getAllArray)

watch(() => tableStore.getFinalUrl, async (newValue) => {
  IncLoading()
  bugsStore.resetState()
  await fetchAll(newValue)
  DecLoading()
})

onMounted(async () => {
  IncLoading()
  await fetchAll(tableStore.getFinalUrl)
  DecLoading()
})

function searchEntity(event: KeyboardEvent) {
  clearTimeout(state.timeout)
  state.timeout = setTimeout(() => {
    setSearch(state.search)
  }, 500)
}
</script>

<route>
{meta: {
  layout: "AdminDashboardLayout"
}
}
</route>
