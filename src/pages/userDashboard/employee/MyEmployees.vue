<template>
<div class="relative min-h-screen px-4 py-6 text-left transition-all duration-500 ease-in-out transform">
  <EmployeeList />
</div>
</template>

<script setup lang="ts">
const { IncLoading, DecLoading } = useUiStore()
const userStore = useUserStore()

const employeeStore = useEmployeeStore()
const tableStore = useTableStore()
const { fetchAllByUserId, fetchAll } = employeeHook()

watch(() => tableStore.getFinalUrl, async newValue => {
  IncLoading()
  employeeStore.resetState()
  await fetchAll(newValue)
  DecLoading()
})

onMounted(async() => {
  if (userStore.getCurrentUserId) {
    IncLoading()
    await fetchAllByUserId(userStore.getCurrentUserId)
    DecLoading()
  }
})
</script>
