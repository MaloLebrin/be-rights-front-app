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

<route>
{meta: {
  layout: "AdminDashboardLayout"
}
}
</route>

<script setup lang="ts">
import { employeeHook } from '@/hooks'
import { useEmployeeStore, useUiStore } from '@/store'

const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
const { fetchAll } = employeeHook()
const { getAllArray } = useEmployeeStore()

const employees = computed(() => getAllArray)

onMounted(async () => {
  IncLoading()
  await fetchAll(50)
  DecLoading()
})
</script>