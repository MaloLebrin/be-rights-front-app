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
			>
				<DashboardItem :index="index">
					<template #title>
						<div class="grid grid-cols-4 gap-4 py-4 px-4">
							<span class="text-sm text-gray-500">Prénom - Nom</span>
							<span class="text-sm text-gray-500">Email</span>
							<span class="text-sm text-gray-500">Téléphone</span>
							<span class="text-sm text-gray-500">Créé le :</span>
							<span>{{ employee.firstName }} {{ employee.lastName }}</span>
							<span>{{ employee.email }}</span>
							<span>{{ employee.phone }}</span>
							<span>{{ getDate(employee.createdAt.toString()) }}</span>
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
							@click="deleteOneEmployee(employee.id)"
						>Supprimer {{ employee.firstName }} {{ employee.lastName }}</BLink>
					</template>
				</DashboardItem>
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
import { employeeHook, dateHook } from '@/hooks'
import { useEmployeeStore, useMainStore, useUiStore, useUserStore } from '@/store/index'
import { EmployeeType } from '@/store/typesExported'
import { LoaderTypeEnum } from '@/types/globals'

const { IncLoading, DecLoading } = useUiStore()
const { isDarkTheme } = useMainStore()
const uiStore = useUiStore()
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

}

function deleteOneEmployee(id: number) {
	return
}
</script>