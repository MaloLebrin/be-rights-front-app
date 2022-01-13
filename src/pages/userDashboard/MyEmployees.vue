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
			<Loader v-if="state.getIsLoading" :isLoading="state.getIsLoading" :type="LoaderTypeEnum.BOUNCE" />
			<div
				v-else-if="!state.getIsLoading && employees.length > 0"
				v-for="(employee, index) in employees"
				:key="employee.id"
				class="flex items-center relative"
			>
				<EmployeeUserItem :employee="employee" />
			</div>
			<h4
				v-else
				class="text-blue-dark dark:text-white font-semibold text-2xl"
			>Vous n'avez aucun destinataire enregistré</h4>
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
import { useEmployeeStore, useMainStore, useUiStore, useUserStore } from '@/store/index'
import { LoaderTypeEnum } from '@/types/globals'
import { ModalNameEnum, ModalModeEnum, EmployeeType } from '@/store/typesExported'

const { setUiModal } = useUiStore()
const { getCurrent } = useUserStore()

const { fetchAllByUserId, getWhereArray: getWhereArrayEmployees } = useEmployeeStore()

const state = reactive<{
	getIsLoading: boolean
}>({
	getIsLoading: false,
})

const employees = computed(() => getWhereArrayEmployees(employee => employee.createdByUser === getCurrent!.id))

onMounted(async () => {
	state.getIsLoading = true
	await fetchAllByUserId(getCurrent!.id)
	state.getIsLoading = false
})
</script>