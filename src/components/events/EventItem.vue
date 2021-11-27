<template>
<DashboardItem
  :index="index"
  @updateOneItem="testEvent"
  @addOne="testEvent"
  @deleteOne="testEvent"
  @download="testEvent"
>
  <template #title>
    <div class="flex items-center justify-between px-5 py-2 font-semibold text-black dark:text-white">
      <div>{{ event.id }}</div>
      <span class="bg-gray mx-3">{{ event.name }}</span>
      <span>{{ getDate(new Date(event.start)) }}</span>
      <button class="px-2 py-1 border-2 border-green rounded-lg text-green font-medium
      hover:text-white hover:bg-green mx-3">
        Relancer
      </button>
      <div class="flex items-center mx-3">
        {{ getSignatureCount(employees)}}/{{ event.totalSignatureNeeded }}
        <!-- // TODO algo to calcul the percentage -->
        <div class="ml-2 rounded-full border-red border-4 w-5 h-5" />
      </div>
      <span :class="getEventStatusColor(event.status)">{{ getEventStatusTranslation(event.status) }}</span>
    </div>
  </template>

  <div class="mt-2">
    <EmployeeEventItem
      v-if="employees.length > 0"
      v-for="employee in employees"
      :key="employee.id"
      :employee="employee"
    />
    <span v-else>Aucun employé</span>
  </div>
</DashboardItem>
</template>

<script setup lang="ts">
import { onMounted, PropType, computed } from 'vue'
import eventHook from '@/hooks/eventHook'
import dateHook from '@/hooks/dateHook'
import useEmployeeStore  from '@/store/employees/employeStore'
import EmployeeEventItem from '@/components/employees/employeeEventItem.vue'
import { storeToRefs } from 'pinia'
import employeeHook from '@/hooks/employeeHook'
import { EventType } from '@/store/typesExported'

const props = defineProps({
  event: {
    type: Object as PropType<EventType>,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

const { getDate } = dateHook()
const { getEventStatusTranslation, getEventStatusColor, getSignatureCount } = eventHook()
const { getEmployeesByEventId } = employeeHook()
const employeeStore = useEmployeeStore()
const { entities} = storeToRefs(employeeStore)

const employees = computed(() => Object.values(entities.value.byId).filter(employee => employee.event === props.event.id))

onMounted(async () => {
  await getEmployeesByEventId(props.event.id)
})

function testEvent(event: any) {
  console.log(event, 'testEvent')
}

</script>
