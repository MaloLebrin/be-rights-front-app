<template>
  <div
    class="relative min-h-screen py-6 pr-8 text-left transition-all duration-500 ease-in-out transform bg-white-light dark:bg-blue-dark pl-14"
  >
    <HeaderList>
      <template #title>
        <UsersIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />Destinataires
      </template>
    </HeaderList>
    <EmployeeList :employees="employees" />
  </div>
</template>


<script setup lang="ts">
import { employeeHook } from '@/hooks'
import { useEmployeeStore, useUiStore, useTablestore } from '@/store'

const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
const tableStore = useTablestore()

const { fetchAll } = employeeHook()
const employeeStore = useEmployeeStore()

const employees = computed(() => employeeStore.getAllArray)


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
</script>

<route>
{meta: {
  layout: "AdminDashboardLayout"
}
}
</route>
