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

    <BAccordion
      v-for="event in events"
      :key="event.id"
      class="flex flex-col items-center mb-6 bg-white dark:bg-blue-dark_bold rounded-full shadow-2xl
      hover:-translate-y-2 animate-fade-in-down max-w-3xl pb-4"
    >
      <template #title>
        <div class="flex items-center justify-between px-5 py-2 font-semibold">
          <div>{{ event.id }}</div>
          <span class="bg-gray">{{ event.name }}</span>
          <span>{{ event.start }}</span>
          <button>relancer</button>
          <div>
            {{ event.signatureCount}}/{{ event.totalSignatureNeeded }}
          </div>
          <span>{{ getEventStatusTranslation(event.status) }}</span>
        </div>
      </template>

      <div class="px-4 mt-2">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis quae neque maiores velit itaque nisi, maxime repellat mollitia laudantium distinctio voluptate veritatis natus fugit accusamus iure illo minima molestias inventore.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus laboriosam voluptatum maiores commodi nam, dignissimos a dolore assumenda excepturi repellat rerum non asperiores fugit vitae ea illo facilis neque! Quis!
      </div>
    </BAccordion>

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
import { useEventStore } from '~/store/events/eventStore'
import eventHook from '~/hooks/eventHook'

const { getEventStatusTranslation } = eventHook()
const eventStore = useEventStore()
const search = ref('')
const events = computed(() => Object.values(eventStore.entities.byId))
console.log(events.value, 'events.value')
</script>