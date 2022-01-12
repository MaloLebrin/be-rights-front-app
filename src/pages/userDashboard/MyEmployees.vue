<template>
	<div
		class="bg-white-light dark:bg-blue-dark min-h-screen transform ease-in-out transition-all duration-500 py-6 text-left pl-14 pr-8 relative"
	>
		<HeaderList>
			<template #title>
				<UserGroupIconOutline class="h-8 mr-4 dark:bg-red rounded-lg p-1" />Mes destinataires
			</template>
		</HeaderList>
		<div class="relative mt-32">
			<Loader v-if="isLoading" :isLoading="isLoading" :type="LoaderTypeEnum.BOUNCE" />
			<div
				v-else-if="!isLoading && events.length > 0"
				v-for="(event, index) in events"
				:key="event.id"
				class="flex items-center relative"
			>
				<!-- <EventItem :event="event" :index="index" @addOne="addOneEmployeeToEvent(event.id)" /> -->
			</div>
			<h4 v-else class="text-white font-semibold text-2xl">Vous n'avez aucun destinataire enregistré</h4>
		</div>
	</div>
</template>

<route>
{meta: {
  layout: "DashboardLayout"
}
}
</route>

<script setup lang="ts">
import { useEmployeeStore, useUiStore, useUserStore } from '@/store/index'
import { LoaderTypeEnum } from '@/types/globals'
import { eventHook } from '@/hooks'
import { ModalNameEnum, ModalModeEnum } from '@/store/typesExported'

const { setUiModal } = useUiStore()
const { getCurrent } = useUserStore()
const { fetchEventsByUser } = eventHook()
const search = ref('')
const isLoading = ref(false)

onMounted(async () => {
	// console.log(getCurrent, 'getCurrent')
	isLoading.value = true
	// await fetchEventsByUser(getCurrent!?.id)
	isLoading.value = false
})


</script>