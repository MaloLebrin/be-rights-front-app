<template>
  <div class="bg-white-light dark:bg-blue-dark min-h-screen transform ease-in-out transition-all duration-500 py-6 text-left pl-14 pr-8">
    <div class="grid grid-cols-3 items-center mb-14">
      <h3 class="text-2xl font-semibold text-gray-800 dark:text-white flex items-center max-w-xs mt">
        <HomeIcon class="h-8 mr-4 dark:bg-red rounded-lg p-1" />
        Événements
      </h3>
      <div class="flex col-span-2 items-center justify-center">
        <BButton class="mr-2 dark:text-black">Tout</BButton>
        <BButton class="mr-2 dark:text-black">En cours</BButton>
        <BButton class="mr-2 dark:text-black">À venir</BButton>
        <BButton class="mr-2 dark:text-black">Terminés</BButton>
        <BInput type="text" placeholder="Recherchez" v-model="search" />
      </div>
    </div>

  <div
    v-for="(event, index) in events"
    :key="event.id"
    class="flex items-center"
  >
    <EventItem :event="event" :index="index"/>
    </div>
  </div>
</template>
<route>
{meta: {
  layout: "AdminDashboardLayout"
}
}
</route>

<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/outline'
import { computed, ref } from 'vue'
import useEventStore  from '@/store/events/eventStore'

const eventStore = useEventStore()
const search = ref('')
const events = computed(() => Object.values(eventStore.entities.byId))

</script>