<template>
<div
  class="relative min-h-screen py-6 pr-8 text-left transition-all duration-500 ease-in-out transform pl-14"
>
  <div class="flex items-center">
    <CalendarIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />
    <h1
      class="flex items-center max-w-xs text-2xl font-semibold text-gray-800 dark:text-white mt"
    >
      Destinaire n° {{ params.employeeId }} {{ getEmployeeFullname(employee) }}
    </h1>
  </div>
</div>
</template>

<script setup lang="ts">
const { params } = useRoute()
const employeeStore = useEmployeeStore()
const { getEmployeeFullname } = employeeHook()
const employee = computed(() => employeeStore.getOne(parseInt(params.employeeId as string)))
</script>
