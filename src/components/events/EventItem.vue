<template>
<div :id="`accordion${index}`" class="flex items-center">

    <BAccordion
      class="flex flex-col items-center mb-6 bg-white dark:bg-blue-dark_bold rounded-full shadow-2xl
      hover:-translate-y-2 animate-fade-in-down max-w-3xl pb-4"
    >
      <template #title>
        <div class="flex items-center justify-between px-5 py-2 font-semibold">
          <div>{{ event.id }}</div>
          <span class="bg-gray">{{ event.name }}</span>
          <span>{{ getDate(new Date(event.start)) }}</span>
          <button class="px-2 py-1 border-2 border-green rounded-lg text-green font-medium
          hover:text-white hover:bg-green">
            Relancer
          </button>
          <div class="flex items-center">
            {{ event.signatureCount}}/{{ event.totalSignatureNeeded }}
            <!-- // TODO algo to calcul the percentage -->
            <div class="ml-2 rounded-full border-red border-4 w-5 h-5" />
          </div>
          <span :class="getEventStatusColor(event.status)">{{ getEventStatusTranslation(event.status) }}</span>
        </div>
      </template>

      <div class="px-4 mt-2">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis quae neque maiores velit itaque nisi, maxime repellat mollitia laudantium distinctio voluptate veritatis natus fugit accusamus iure illo minima molestias inventore.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus laboriosam voluptatum maiores commodi nam, dignissimos a dolore assumenda excepturi repellat rerum non asperiores fugit vitae ea illo facilis neque! Quis!
      </div>
    </BAccordion>
    <div class="flex flex-col justify-around h-full ml-3 cursor-pointer" @click="toggleExtraOptions(index)">
      <div class="rounded-full bg-gray-500 h-1 w-1 mb-1" />
      <div class="rounded-full bg-gray-500 h-1 w-1 mb-1" />
      <div class="rounded-full bg-gray-500 h-1 w-1" />
    </div>

    <div class="flex flex-col ml-4 px-4 py-2 rounded-xl text-xs duration-500 ease-in-out transition-all" :class="extraButtonOpen === index ? 'opacity-1': 'opacity-0'">
      <BLink variant="white" class="bg-gray-500 rounded mb-1 py-2 px-4 font-medium hover:translate-x-3 transform transition-all duration-500">modifier</BLink>
      <BLink variant="white" class="bg-gray-500 rounded mb-1 py-2 px-4 font-medium hover:translate-x-3 transform transition-all duration-500">+ Ajouter</BLink>
      <BLink variant="white" class="bg-gray-500 rounded mb-1 py-2 px-4 font-medium hover:translate-x-3 transform transition-all duration-500">Supprimer</BLink>
      <BLink variant="white" class="bg-gray-500 rounded mb-1 py-2 px-4 font-medium hover:translate-x-3 transform transition-all duration-500">Tout télécharger</BLink>
    </div>
</div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, PropType, onBeforeUnmount } from 'vue'
import { useEventStore } from '~/store/events/eventStore'
import eventHook from '~/hooks/eventHook'
import dateHook from '~/hooks/dateHook'
import { EventType } from '~/store/events/types'

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
const { getEventStatusTranslation, getEventStatusColor } = eventHook()

const extraButtonOpen = ref<null | number>(null)
const eventStore = useEventStore()
const search = ref('')

function toggleExtraOptions(index: number|null) {
  extraButtonOpen.value = index
}

onMounted(() => {
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


</script>