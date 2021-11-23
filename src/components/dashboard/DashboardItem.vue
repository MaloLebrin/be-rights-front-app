<template>
<div :id="`accordion${index}`" class="flex items-center lg:w-full">

	<BAccordion
		class="flex flex-col items-center mb-6 bg-white dark:bg-blue-dark_bold rounded-full shadow-2xl
		hover:-translate-y-2 animate-fade-in-down max-w-3xl pb-4 w-3/4"
	>
		<template #title>
			<slot  name="title" />
		</template>

		<slot />
	</BAccordion>

	<div class="flex flex-col ml-4 px-4 py-2 rounded-xl text-xs duration-500 ease-in-out transition-all w-1/5" :class="extraButtonOpen === index ? 'opacity-1': 'opacity-0'">
		<BLink :variant="extraButtonStyle" class="EventActionButton" @click="events('udpateOneItem')">modifier</BLink>
		<BLink :variant="extraButtonStyle" class="EventActionButton" @click="events('addOne')">+ Ajouter</BLink>
		<BLink :variant="extraButtonStyle" class="EventActionButton" @click="events('deleteOne')">Supprimer</BLink>
		<BLink :variant="extraButtonStyle" class="EventActionButton" @click="events('downloadAll')">Tout télécharger</BLink>
	</div>
</div>

</template>

<script setup lang="ts">
import { ref, onMounted, PropType, onBeforeUnmount, computed } from 'vue'
import useMainStore from '@/store/mainStore'

const props = defineProps({
	index: {
		type: Number as PropType<number>,
		required: true
	}
})

const events = defineEmits<{
	(e: 'udpateOneItem'): void
	(e: 'addOne'): void
	(e: 'deleteOne'): void
	(e: 'downloadAll'): void
}>()

const mainStore = useMainStore()
const { isDarkTheme } = mainStore

const extraButtonOpen = ref<null | number>(null)

function toggleExtraOptions(index: number|null) {
  extraButtonOpen.value = index
}

onMounted(() => {
  const item = document.getElementById(`accordion${props.index}`)
  item?.addEventListener('mouseover', () => {
	toggleExtraOptions(props.index)
  })
  item?.addEventListener('mouseout', () => {
	toggleExtraOptions(null)
  })
})

onBeforeUnmount(() => {
    const item = document.getElementById(`accordion${props.index}`)
	item?.removeEventListener('mouseover', () => toggleExtraOptions(null))
	item?.removeEventListener('mouseout', () => toggleExtraOptions(null))
})

const extraButtonStyle = computed(() => isDarkTheme ? 'primary' : "white")
</script>

<style scoped>
  .EventActionButton {
    @apply cursor-pointer bg-gray-500 rounded mb-1 py-2 px-4 font-semibold hover:translate-x-3 transform transition-all duration-500 
    dark:bg-white-break dark:text-gray-900
  }
</style>