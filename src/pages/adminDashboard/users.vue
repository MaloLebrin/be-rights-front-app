<template>
  <div
    class="min-h-screen py-6 pr-8 text-left transition-all duration-500 ease-in-out transform pl-14"
  >
    <HeaderList>
      <template #title>
        <UserGroupIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />Utilisateurs
      </template>
      <template #additionnalButtons>
        <BInput
          v-model="state.search"
          type="text"
          placeholder="Recherchez"
          @keyup="searchEntity($event)"
        />
      </template>
    </HeaderList>
    <UserList :users="users" />
  </div>
</template>

<script setup lang="ts">
import { useTablestore, useUiStore, useUserStore } from '@/store'
import { userHook } from '@/hooks'

const { fetchAll } = userHook()

const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
const tableStore = useTablestore()
const { setSearch } = tableStore
const userStore = useUserStore()
const users = computed(() => userStore.getAllArray)

const state = reactive({
  search: '',
  timeout: 0,
})

watch(() => tableStore.getFinalUrl, async (newValue) => {
  IncLoading()
  userStore.resetState()
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
  layout: "AdminDashboardLayout",
}
}
</route>
