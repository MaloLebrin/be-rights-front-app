<template>
<div
  v-if="employee"
  class="grid items-center w-full grid-cols-5 gap-8 px-4 py-3 text-sm hover:bg-gray-300 dark:hover:bg-gray-700"
>
  <div class="flex items-center col-span-2 text-gray-700 dark:text-white-break">
    {{ employee.firstName }}
    {{ employee.lastName }}
  </div>

  <div :class="getEmployeeStatusColor(employee)">
    {{ getEmployeeStatusSignature(employee) }}
  </div>
</div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { EmployeeType } from '@/types'

defineProps({
  employee: Object as PropType<EmployeeType>,
})
const { getEmployeeStatusColor, getEmployeeStatusSignature } = employeeHook()
</script>
