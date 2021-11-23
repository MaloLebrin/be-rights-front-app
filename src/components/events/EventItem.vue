<template>
<div :id="`accordion${index}`" class="flex items-center lg:w-full">

    <BAccordion
      class="flex flex-col items-center mb-6 bg-white dark:bg-blue-dark_bold rounded-full shadow-2xl
      hover:-translate-y-2 animate-fade-in-down max-w-3xl pb-4 w-3/4"
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
    </BAccordion>

    <div class="flex flex-col ml-4 px-4 py-2 rounded-xl text-xs duration-500 ease-in-out transition-all w-1/5" :class="extraButtonOpen === index ? 'opacity-1': 'opacity-0'">
      <BLink :variant="extraButtonStyle" class="EventActionButton">modifier</BLink>
      <BLink :variant="extraButtonStyle" class="EventActionButton">+ Ajouter</BLink>
      <BLink :variant="extraButtonStyle" class="EventActionButton">Supprimer</BLink>
      <BLink :variant="extraButtonStyle" class="EventActionButton">Tout télécharger</BLink>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted, PropType, onBeforeUnmount, computed } from 'vue'
import eventHook from '@/hooks/eventHook'
import dateHook from '@/hooks/dateHook'
import { EventType } from '@/store/events/types'
import useMainStore from '@/store/mainStore'
import useEmployeeStore  from '@/store/employees/employeStore'
import EmployeeEventItem from '@/components/employees/employeeEventItem.vue'
import { storeToRefs } from 'pinia'
import employeeHook from '@/hooks/employeeHook'

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
const mainStore = useMainStore()
const employeeStore = useEmployeeStore()
const { entities} = storeToRefs(employeeStore)
const { isDarkTheme } = mainStore

const employees = computed(() => Object.values(entities.value.byId).filter(employee => employee.event === props.event.id))
console.log(employees.value, 'employees.value')

const extraButtonOpen = ref<null | number>(null)

function toggleExtraOptions(index: number|null) {
  extraButtonOpen.value = index
}

onMounted(async () => {
  await getEmployeesByEventId(props.event.id)
  const eventItem = document.getElementById(`accordion${props.index}`)
  eventItem?.addEventListener('mouseover', () => {
	toggleExtraOptions(props.index)
  })
  eventItem?.addEventListener('mouseout', () => {
	toggleExtraOptions(null)
  })
})

onBeforeUnmount(() => {
    const eventItem = document.getElementById(`accordion${props.index}`)
	eventItem?.removeEventListener('mouseover', () => toggleExtraOptions(null))
	eventItem?.removeEventListener('mouseout', () => toggleExtraOptions(null))
})

const extraButtonStyle = computed(() => isDarkTheme ? 'primary' : "white")


</script>

<style scoped>
  .EventActionButton {
    @apply cursor-pointer bg-gray-500 rounded mb-1 py-2 px-4 font-semibold hover:translate-x-3 transform transition-all duration-500 
    dark:bg-white-break dark:text-gray-900
  }
</style>