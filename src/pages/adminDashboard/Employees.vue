<template>
  <div
    class="container relative min-h-screen py-6 pr-8 mx-auto text-left transition-all duration-500 ease-in-out transform pl-14"
  >
    <HeaderList>
      <template #title>
        <UsersIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />Destinataires
      </template>
      <template #additionnalButtons>
        <BaseInput
          v-model="state.search"
          type="text"
          placeholder="Recherchez"
          @keyup="searchEntity($event)"
        />
      </template>
    </HeaderList>
    <EmployeeList :employees="employees" />
  </div>
</template>


<script setup lang="ts">
const { IncLoading, DecLoading } = useUiStore()
const tableStore = useTableStore()
const { setSearch } = tableStore

const { fetchAll } = employeeHook()
const employeeStore = useEmployeeStore()

const employees = computed(() => employeeStore.getAllArray)

const state = reactive({
  search: '',
  timeout: 0,
})

watch(() => tableStore.getFinalUrl, async (newValue) => {
  IncLoading()
  employeeStore.resetState()
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
