<template>
	<div
		v-if="event"
		class="grid grid-cols-5 gap-8 items-center px-4 py-3 w-full hover:bg-gray-300 text-sm dark:hover:bg-gray-700"
	>
		{{ event.id}}
		<div class="dark:text-white-break">
			{{ event.name }}
		</div>
		<div class="flex items-center justify-center text-center">
			<div
				class="text-center dark:text-white-break mr-2"
			>
				Début: {{ getDate(new Date(event.start)) }}
			</div>
			<div
				class="text-center dark:text-white-break"
			>
				Fin: {{ getDate(new Date(event.end)) }}
			</div>
		</div>

		<span :class="getEventStatusColor(event.status)">{{ getEventStatusTranslation(event.status) }}</span>

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