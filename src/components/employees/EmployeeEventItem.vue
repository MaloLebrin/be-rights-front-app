<template>
	<div
		v-if="employee"
		class="grid grid-cols-5 gap-8 items-center px-4 py-3 w-full hover:bg-gray-600 text-sm"
	>
		<div class="flex items-center col-span-2">
			{{ employee.firstName }}
			{{ employee.lastName }}
		</div>

		<div :class="getEmployeeStatusColor(employee)">
			{{ getEmployeeStatusSignature(employee) }}
		</div>

		<DocumentDownloadIcon  class="h-6 w-6 cursor-pointer" />

		<div class="flex items-center justify-center text-center">
			<div v-if="employee.signedAt" class="text-center">
				{{ getDate(new Date(employee.signedAt), DateFormatEnum.DDMM) }}
			</div>
			<button v-else class="px-1 py-1 border-2 border-green rounded-lg text-green font-medium text-xs
				hover:text-white hover:bg-green">
				Relancer
			</button> 
		</div>
	</div>
</template>

<script setup lang="ts">
import { EmployeeType } from '@/store/employees/types'
import { DateFormatEnum } from '@/types/Date'
import { PropType } from 'vue'
import employeeHook from '@/hooks/employeeHook'
import dateHook from '@/hooks/dateHook'
import { 
	DocumentDownloadIcon
 } from '@heroicons/vue/outline'

const props = defineProps({
	employee: Object as PropType<EmployeeType>
})

const { getEmployeeStatusColor, getEmployeeStatusSignature } = employeeHook()
const { getDate } = dateHook()

</script>