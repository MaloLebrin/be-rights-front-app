<template>
  <div
    v-if="employee"
    class="grid items-center w-full grid-cols-5 gap-8 px-4 py-3 text-sm hover:bg-gray-300 dark:hover:bg-gray-700"
  >
    <div class="flex items-center col-span-2 dark:text-white-break">
      {{ employee.firstName }}
      {{ employee.lastName }}
    </div>

    <div :class="getEmployeeStatusColor(employee)">{{ getEmployeeStatusSignature(employee) }}</div>

    <DocumentDownloadIconOutline class="w-6 h-6 cursor-pointer dark:text-white" />

    <div class="flex items-center justify-center text-center">
      <div
        v-if="employee.signedAt"
        class="text-center dark:text-white-break"
      >{{ getDate(employee.signedAt.toString(), DateFormatEnum.DDMM) }}</div>
      <button
        v-else
        class="px-1 py-1 text-xs font-medium border-2 rounded-lg border-green text-green hover:text-white hover:bg-green"
      >Relancer</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DateFormatEnum } from '@/types/Date'
import { PropType } from 'vue'
import { EmployeeType } from '@/types/typesExported'

const props = defineProps({
  employee: Object as PropType<EmployeeType>
})
const { getEmployeeStatusColor, getEmployeeStatusSignature } = employeeHook()
const { getDate } = dateHook()
</script>