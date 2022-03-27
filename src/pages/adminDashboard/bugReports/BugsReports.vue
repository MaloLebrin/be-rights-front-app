<template>
  <div
    class="container relative min-h-screen py-6 pr-8 mx-auto text-left transition-all duration-500 ease-in-out transform dark:bg-blue-dark pl-14"
  >
    <HeaderList>
      <template #title>
        <UsersIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />Bugs
      </template>
      <template #additionnalButtons>
        <BaseInput
          class="ml-12"
          v-model="state.search"
          type="text"
          placeholder="Recherchez"
          @keyup="searchEntity($event)"
        />
      </template>
    </HeaderList>
    <div class="relative mt-32">
      <Loader
        v-if="uiStore.getUIIsLoading"
        :isLoading="uiStore.getUIIsLoading"
        :type="LoaderTypeEnum.BOUNCE"
      />

      <div
        v-else-if="!uiStore.getUIIsLoading && bugs.length > 0"
        v-for="(bug, index) in bugs"
        :key="bug.id"
      >
        <DashboardItem :index="index">
          <template #title>
            <div class="px-4 py-4 border-b border-gray-400 dark:border-white-light">{{ bug.name }}</div>
          </template>
          <div class="py-12">{{ bug.description }}</div>
        </DashboardItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BugReportType, LoaderTypeEnum } from '@/types/typesExported'

const tableStore = useTableStore()
const { setSearch } = tableStore
const { IncLoading, DecLoading } = useUiStore()
const bugsStore = useBugStore()
const uiStore = useUiStore()

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
  state.timeout = window.setTimeout(() => {
    setSearch(state.search)
  }, 500)
}
</script>

<route>
{
  meta: {
    layout: "AdminDashboardLayout",
    isAuth: true,
  }
}
</route>
