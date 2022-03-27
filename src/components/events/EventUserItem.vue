<template>
  <div
    v-if="event"
    class="grid items-center w-full grid-cols-5 gap-8 px-4 py-3 text-sm text-left hover:bg-gray-300 dark:hover:bg-gray-700"
  >
    <div class="text-blue dark:text-white-break">{{ event.id }}</div>
    <div class="text-blue dark:text-white-break">{{ event.name }}</div>
    <div class="text-blue dark:text-white-break">Début: {{ getDate(event.start.toString()) }}</div>
    <div class="text-blue dark:text-white-break">Fin: {{ getDate(event.end.toString()) }}</div>

    <div :class="getEventStatusColor(event.status)">{{ getEventStatusTranslation(event.status) }}</div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { EventType } from '@/types/typesExported'

defineProps({
  event: Object as PropType<EventType>
})
const { getDate } = dateHook()
const { getEventStatusTranslation, getEventStatusColor } = eventHook()
</script>