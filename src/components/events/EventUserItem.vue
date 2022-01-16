<template>
	<div
		v-if="event"
		class="grid grid-cols-5 gap-8 items-center px-4 py-3 w-full hover:bg-gray-300 text-sm dark:hover:bg-gray-700 text-left"
	>
		<div class="text-blue dark:text-white-break">{{ event.id }}</div>
		<div class="text-blue dark:text-white-break">{{ event.name }}</div>
		<div class="text-blue dark:text-white-break">Début: {{ getDate(event.start.toString()) }}</div>
		<div class="text-blue dark:text-white-break">Fin: {{ getDate(event.end.toString()) }}</div>

		<div :class="getEventStatusColor(event.status)">{{ getEventStatusTranslation(event.status) }}</div>
	</div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { EventType } from '@/store/typesExported'
import { dateHook, eventHook } from '@/hooks'

defineProps({
	event: Object as PropType<EventType>
})
const { getDate } = dateHook()
const { getEventStatusTranslation, getEventStatusColor } = eventHook()

</script>