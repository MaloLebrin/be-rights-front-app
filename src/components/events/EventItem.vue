<template>
  <DashboardItem :index="index">
    <template #title>
      <div
        class="flex items-center justify-between px-5 py-2 font-semibold text-black dark:text-white"
      >
        <div>{{ event.id }}</div>
        <span class="mx-3 bg-gray">{{ event.name }}</span>
        <span>{{ getDate(event.start.toString()) }}</span>
        <button
          class="px-2 py-1 mx-3 font-medium border-2 rounded-lg border-green text-green hover:text-white hover:bg-green"
        >Relancer</button>
        <div class="flex items-center mx-3">
          {{ getSignatureCount(employees) }}/{{ event.totalSignatureNeeded }}
          <!-- // TODO algo to calcul the percentage -->
          <div class="w-5 h-5 ml-2 border-4 rounded-full border-red" />
        </div>
        <span
          :class="getEventStatusColor(event.status)"
        >{{ getEventStatusTranslation(event.status) }}</span>
      </div>
    </template>

    <div class="mt-2">
      <EmployeeEventItem
        v-if="employees.length > 0"
        v-for="employee in employees"
        :key="employee.id"
        :employee="employee"
      />
      <span v-else class="ml-3">Aucun employé</span>
    </div>

    <template #extraButton>
      <BLink
        :variant="extraButtonStyle"
        class="EventActionButton"
        @click="emit('udpateOneItem', index)"
      >
        <PencilAltIconOutline class="w-4 h-4 mr-2 text-gray-800" />modifier event
      </BLink>
      <BLink :variant="extraButtonStyle" class="EventActionButton" @click="emit('addOne', index)">
        <PlusCircleIconOutline class="w-4 h-4 mr-2 text-gray-800" />Ajouter
      </BLink>
      <BLink
        :variant="extraButtonStyle"
        class="EventActionButton"
        @click="emit('deleteOne', index)"
      >
        <TrashIconOutline class="w-4 h-4 mr-2 text-red-800" />Supprimer
      </BLink>
      <BLink
        :variant="extraButtonStyle"
        :disabled="true"
        class="cursor-not-allowed EventActionButton"
        @click="emit('downloadAll')"
      >
        <DownloadIconOutline class="w-4 h-4 mr-2 text-gray-800" />Tout télécharger
      </BLink>
    </template>
  </DashboardItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import EmployeeEventItem from '@/components/employees/employeeEventItem.vue'
import { EventType } from '@/types/typesExported'
import { useEmployeeStore } from '@/store'

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
const mainStore = useMainStore()
const { isDarkTheme } = mainStore

const { getDate } = dateHook()
const { getEventStatusTranslation, getEventStatusColor, getSignatureCount } = eventHook()
const { getEmployeesByEventId } = employeeHook()
const employeeStore = useEmployeeStore()
const { getAllByEventId } = employeeStore

const employees = computed(() => getAllByEventId(props.event.id))

onMounted(async () => {
  if (props.event.id) {
    await getEmployeesByEventId(props.event.id)
  }
})

const emit = defineEmits<{
  (e: 'udpateOneItem', index: number): void
  (e: 'addOne', index: number): void
  (e: 'deleteOne', index: number): void
  (e: 'downloadAll'): void
}>()


const extraButtonStyle = computed(() => isDarkTheme ? 'primary' : "white")
</script>

<style scoped>
.EventActionButton {
  @apply flex items-center cursor-pointer bg-gray-500 rounded mb-1 py-2 px-4 font-semibold hover:translate-x-3 transform transition-all duration-500 
    dark:bg-white-break dark:text-gray-900;
}
</style>
