<template>
<div
  class="relative min-h-screen px-4 py-6 text-left transition-all duration-500 ease-in-out transform"
>
  <EmployeeList />
</div>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router'
import { uniq } from '@/utils/array'

const tableStore = useTableStore()
const { setFilters } = useTableStore()
const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
const userStore = useUserStore()
const employeeStore = useEmployeeStore()

const { fetchAll } = employeeHook()
const { fetchMany } = userHook()
const { fetchLogoByUserId } = fileHook()

onBeforeRouteLeave(() => {
  setFilters(null)
})

watch(() => tableStore.getFinalUrl, async newValue => {
  IncLoading()
  employeeStore.resetState()
  await fetchAll(newValue)
  DecLoading()
})

onMounted(async () => {
  IncLoading()
  await fetchAll(tableStore.getFinalUrl)
  if (employeeStore.getAllArray.length > 0) {
    const userIds = employeeStore.getAllArray.map(employee => employee.createdByUser) as number[]
    if (userIds.length > 0) {
      const uniqIds = uniq(userIds)
      const missingIds = uniqIds.filter(id => !userStore.isAlreadyInStore(id))
      if (missingIds.length > 0) {
        await fetchMany(missingIds)
      }
      await Promise.all(uniqIds.map(id => fetchLogoByUserId(id)))
    }
  }
  DecLoading()
})
</script>
