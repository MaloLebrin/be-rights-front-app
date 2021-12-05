<template>
	<div v-if="user" class="mt-4 px-4 w-full h-full">
		<form
			class="grid grid-cols-2 gap-4"
			@submit.prevent="submit"
		>
			<BField label="Prénom" labelFor="firstName">
				<BInput
					class="text-white dark:text-blue-dark"
					type="text"
					id="firstName"
					v-model="user.firstName"
				/>
			</BField>
			<BField label="Nom" labelFor="lastName">
				<BInput
					class="text-white dark:text-blue-dark"
					type="text"
					id="lastName"
					v-model="user.lastName"
				/>
			</BField>
			<BField label="E-mail" labelFor="email">
				<BInput
					class="text-white dark:text-blue-dark"
					type="email"
					id="email"
					v-model="user.email"
				/>
			</BField>
			<BField label="Nom de l'entreprise" labelFor="companyName">
				<BInput
					class="text-white dark:text-blue-dark"
					type="text"
					id="companyName"
					v-model="user.companyName"
				/>
			</BField>
			<BField
				class="col-span-2"
				label="N° Siret"
				labelFor="siret"
			>
				<BInput
					class="text-white dark:text-blue-dark"
					type="text"
					id="siret"
					v-model="user.siret"
				/>
			</BField>
			<BField label="Role" labelFor="role">
			<Select
				:options="userRolesArray"
				:default="user.roles ? user.roles :'Sélectionnez un Role'"
				@selected="user.roles = $event"
			/>
			</BField>
			<BField label="Abonnement" labelFor="subscription">
			<Select
				:options="userRolesArray"
				:default="user.subscription ? user.subscription :'Sélectionnez un Abonnement'"
				@selected="user.subscription = $event"
			/>
			</BField>
		</form>
		<div class="mt-4 text-black-light">
			<div class="flex items-center justify-between text-blue dark:text-indigo-50">
				<h5 class="text-blue dark:text-white-break font-bold text-xl">{{ eventOrEmployeeSectionTitle }}</h5>
				<Switch
					:label="isEventMode ? 'Voir les employés' : 'Voir les événements'"
					v-model:checked="isEventMode"
				/>
			</div>
			<Loader
				v-if="isLoading"
				:isLoading="isLoading"
				:type="LoaderTypeEnum.BOUNCE"
			/>
			<div v-else>
				<EventUserItem
					v-if="eventByUserId.length && isEventMode"
					v-for="event in eventByUserId"
					:key="event.id"
					:event="event"
				/>
				<!-- <div v-else-if="isEventMode && eventByUserId.length === 0" class="p-4 text-center">Aucun événement</div> -->
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
import { computed, ref, watch } from 'vue'
import { useEmployeeStore, useEventStore, useUserStore } from '@/store'
import { userRolesArray } from '@/types'
import { LoaderTypeEnum } from '@/types/index'

interface Props {
	id: number
}

const props = withDefaults(defineProps<Props>(), {
	id: undefined
})

const userStore = useUserStore()
const eventStore = useEventStore()
const employeeStore = useEmployeeStore()

const user = computed(() => userStore.getOne(props.id))

const isEventMode = ref(true)

const isLoading = ref(false)

const eventOrEmployeeSectionTitle = computed(() => isEventMode.value ? 'Événements' : 'Employés')

watch(() => isEventMode.value, async (newValue) => {
	isLoading.value = true
	if(!newValue) {
		await employeeStore.fetchAllByUserId(user.value.id)
		// console.log(employeeStore.getEmployeesByUserId(user.value.id), 'employeeStore.getEmployeesByUserId(user.value.id)')
	} else {
		await eventStore.fetchAllByUserId(user.value.id)
	}
	isLoading.value = false
})

const eventByUserId = computed(() => eventStore.getEventsByUserId(user.value.id))

const employeeByUserId = computed(() => employeeStore.getEmployeesByUserId(user.value.id))

const emits = defineEmits<{
	(e: 'submit', id: number): void
}>()

function submit() {
	emits('submit', props.id)
}

</script>