<template>
	<div v-if="user" class="mt-4 px-6 w-full h-full">
		<form class="grid grid-cols-2 gap-4">
			<BField
				label="Prénom"
				labelFor="firstName"
				class="text-blue-dark dark:text-white-break"
			>{{ user.firstName }}</BField>
			<BField
				label="Nom"
				labelFor="lastName"
				class="text-blue-dark dark:text-white-break"
			>{{ user.lastName }}</BField>
			<BField
				label="E-mail"
				labelFor="email"
				class="text-blue-dark dark:text-white-break"
			>{{ user.email }}</BField>
			<BField
				label="Nom de l'entreprise"
				labelFor="companyName"
				class="text-blue-dark dark:text-white-break"
			>{{ user.companyName }}</BField>
			<BField
				class="text-blue-dark dark:text-white-break"
				label="N° Siret"
				labelFor="siret"
			>{{ user.siret }}</BField>
			<BField
				v-if="isCurrentUserAdmin"
				label="Role"
				labelFor="role"
				class="text-blue-dark dark:text-white-break"
			>{{ user.roles }}</BField>
			<BField
				label="Abonnement"
				labelFor="subscription"
				class="text-blue-dark dark:text-white-break"
			>{{ getSuscriptionTranslation(user.subscription) }}</BField>
		</form>
		<div class="mt-12 text-black-light">
			<div class="flex items-center justify-between text-blue dark:text-indigo-50">
				<h5 class="text-blue dark:text-white-break font-bold text-xl">{{ eventOrEmployeeSectionTitle }}</h5>
				<Switch
					:label="isEventMode ? 'Voir les employés' : 'Voir les événements'"
					v-model:checked="isEventMode"
				/>
			</div>
			<Loader v-if="isLoading" :isLoading="isLoading" :type="LoaderTypeEnum.BOUNCE" />
			<div v-else>
				<EventUserItem
					v-if="eventByUserId.length && isEventMode"
					v-for="event in eventByUserId"
					:key="event.id"
					:event="event"
				/>
				<div
					v-else-if="isEventMode && eventByUserId.length === 0"
					class="p-4 text-center"
				>Aucun événement</div>
				<EmployeeUserItem
					v-if="employeeByUserId.length && !isEventMode"
					v-for="employee in employeeByUserId"
					:key="employee.id"
					:employee="employee"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang='ts'>
import { subscriptionHook } from '@/hooks'
import { useEmployeeStore, useEventStore, useUserStore } from '@/store'
import { LoaderTypeEnum } from '@/types'

interface Props {
	id: number
}

const props = withDefaults(defineProps<Props>(), {
	id: undefined
})

const { getOne, isCurrentUserAdmin } = useUserStore()
const eventStore = useEventStore()
const employeeStore = useEmployeeStore()
const { getSuscriptionTranslation } = subscriptionHook()
const user = computed(() => getOne(props.id))

const isEventMode = ref(true)

const isLoading = ref(false)

const eventOrEmployeeSectionTitle = computed(() => isEventMode.value ? 'Événements' : 'Employés')


watch(() => isEventMode.value, async (newValue) => {
	isLoading.value = true
	if (!newValue) {
		const employeeIds = user.value?.employee as number[]
		const missingIds = employeeIds.filter(id => !employeeStore.getOne(id))
		if (missingIds.length > 0) {
			await employeeStore.fetchAllByUserId(user.value.id)
		}
	} else {
		const eventIds = user.value?.events as number[]
		const missingIds = eventIds.filter(id => !eventStore.getOne(id))
		if (missingIds.length > 0) {
			await eventStore.fetchAllByUserId(user.value.id)
		}
	}
	isLoading.value = false
})

const eventByUserId = computed(() => eventStore.getMany(user.value.events as number[]))

const employeeByUserId = computed(() => employeeStore.getEmployeesByUserId(user.value.id))

</script>