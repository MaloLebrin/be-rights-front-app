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
			<Loader
				v-if="uiStore.getUIIsLoading"
				:isLoading="uiStore.getUIIsLoading"
				:type="LoaderTypeEnum.BOUNCE"
			/>
			<div
				v-else-if="!uiStore.getUIIsLoading && employees.length > 0"
				v-for="(employee, index) in employees"
				:key="employee.id"
				class="flex items-center relative"
			>
				<EmployeeUserItem :employee="employee" />
			</div>
			<h4
				v-else
				class="text-blue-dark dark:text-white font-semibold text-2xl"
			>Vous n'avez aucun destinataire enregistré user : {{ userStore.getCurrentUserId }}</h4>
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

const { IncLoading, DecLoading } = useUiStore()
const uiStore = useUiStore()
const userStore = useUserStore()

const { fetchAllByUserId, getWhereArray: getWhereArrayEmployees } = useEmployeeStore()

const employees = computed(() => {
	if (userStore.getCurrentUserId) {
		return getWhereArrayEmployees(employee => employee.createdByUser === userStore.getCurrentUserId)
	}
	return []
})

onMounted(async () => {
	if (userStore.getCurrentUserId) {
		IncLoading()
		await fetchAllByUserId(userStore.getCurrentUserId)
		DecLoading()
	}
})
</script>