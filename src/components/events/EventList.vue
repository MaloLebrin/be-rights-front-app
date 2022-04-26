<template>
<div class="h-full px-4 sm:px-6 lg:px-8">
  <div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
      <p class="mt-2 text-sm text-red-700">
        Liste de tous les événements. Ajouter recherche
      </p>
    </div>
    <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
      <button
        type="button"
        class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
      >
        Add user
      </button>
    </div>
  </div>
  <div class="flex flex-col h-full mt-8">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <HeaderEventTable />
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <template v-if="events.length > 0">
                <EventItem
                  v-for="event in events"
                  :key="event.id"
                  :event="event"
                />
              </template>
              <p
                v-else
                class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 truncate whitespace-nowrap sm:pl-6"
              >
                {{ noEventMessage }}
              </p>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import type { EventType } from '@/types/typesExported'

interface Props {
  noEventMessage: string
  events: EventType[]
}

withDefaults(defineProps<Props>(), {
  noEventMessage: 'Aucun événement enregistré!',
  events: () => [],
})
</script>
