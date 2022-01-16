<template>
	<div
		class="relative min-h-screen py-6 pr-8 text-left transition-all duration-500 ease-in-out transform bg-white-light dark:bg-blue-dark pl-14"
	>
		<HeaderList>
			<template #title>
				<UserGroupIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />Mes destinataires
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
			>
				<DashboardItem :index="index">
					<template #title>
						<div class="grid grid-cols-1 gap-4 px-4 py-4 md:grid-cols-4">
							<span class="text-sm text-gray-500 dark:text-gray-400">Prénom - Nom</span>
							<span class="text-sm text-gray-500 dark:text-gray-400">Email</span>
							<span class="text-sm text-gray-500 dark:text-gray-400">Téléphone</span>
							<span class="text-sm text-gray-500 dark:text-gray-400">Créé le :</span>
							<span class="dark:text-white">{{ employee.firstName }} {{ employee.lastName }}</span>
							<span class="dark:text-white">{{ employee.email }}</span>
							<span class="dark:text-white">{{ employee.phone }}</span>
							<span class="dark:text-white">{{ getDate(employee.createdAt.toString()) }}</span>
						</div>
					</template>
					<template #extraButton>
						<BLink
							:variant="extraButtonStyle"
							class="EventActionButton"
							@click="updateOneEmployee(employee)"
						>modifier {{ employee.firstName }} {{ employee.lastName }}</BLink>
						<BLink
							:variant="extraButtonStyle"
							class="EventActionButton"
							@click="deleteOneEmployee(employee)"
						>Supprimer {{ employee.firstName }} {{ employee.lastName }}</BLink>
					</template>
				</DashboardItem>
			</div>
			<h4
				v-else
				class="text-2xl font-semibold text-blue-dark dark:text-white"
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
import { employeeHook, dateHook } from '@/hooks'
import { useEmployeeStore, useMainStore, useUiStore, useUserStore } from '@/store/index'
import { EmployeeType, ModalModeEnum, ModalNameEnum } from '@/store/typesExported'
import { LoaderTypeEnum } from '@/types/globals'

const { IncLoading, DecLoading } = useUiStore()
const { isDarkTheme } = useMainStore()
const uiStore = useUiStore()
const { setUiModal } = uiStore
const userStore = useUserStore()

const { getWhereArray: getWhereArrayEmployees } = useEmployeeStore()
const { fetchAllByUserId } = employeeHook()
const { getDate } = dateHook()

const extraButtonStyle = computed(() => isDarkTheme ? 'primary' : "white")

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

function updateOneEmployee(employee: EmployeeType) {
	setUiModal({
		isActive: true,
		modalName: ModalNameEnum.ADD_EMPLOYEE,
		modalMode: ModalModeEnum.EDIT,
		data: { employee },
	})
}

function deleteOneEmployee(employee: EmployeeType) {
	setUiModal({
		isActive: true,
		modalName: ModalNameEnum.ADD_EMPLOYEE,
		modalMode: ModalModeEnum.DELETE,
		data: { employee },
	})

}
</script>