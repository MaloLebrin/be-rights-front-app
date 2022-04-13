<template>
  <div class="min-h-screen px-8 py-6 text-left transition-all duration-500 ease-in-out transform md:px-20 lg:px-32">
    <HeaderList>
      <template #title>
        <UserGroupIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />Utilisateurs
      </template>
      <template #additionnalButtons>
        <BaseInput v-model="state.search" type="text" placeholder="Recherchez" @keyup="searchEntity($event)" />
      </template>
    </HeaderList>
    <UserList :users="users" />
  </div>
</template>

<script setup lang="ts">
const { fetchAll } = userHook()

const { IncLoading, DecLoading } = useUiStore()
const tableStore = useTableStore()
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
  state.timeout = window.setTimeout(() => {
    setSearch(state.search)
  }, 500)
}
</script>
