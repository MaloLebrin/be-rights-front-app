<template>
	<div v-if="user" class="mt-4 px-6 w-full h-full">
		<form class="grid grid-cols-2 gap-4">
			<BField
				label="Prénom"
				labelFor="firstName"
				:message="firstNameError"
				:status="firstNameMeta.valid ? 'success' : 'error'"
			>
				<BInput class="text-white dark:text-blue-dark" type="text" id="firstName" v-model="firstName" />
			</BField>
			<BField
				label="Nom"
				labelFor="lastName"
				:message="lastNameError"
				:status="lastNameMeta.valid ? 'success' : 'error'"
			>
				<BInput class="text-white dark:text-blue-dark" type="text" id="lastName" v-model="lastName" />
			</BField>
			<BField
				label="E-mail"
				labelFor="email"
				:message="emailError"
				:status="emailMeta.valid ? 'success' : 'error'"
			>
				<BInput class="text-white dark:text-blue-dark" type="email" id="email" v-model="email" />
			</BField>
			<BField
				label="Nom de l'entreprise"
				labelFor="companyName"
				:message="companyNameError"
				:status="companyNameMeta.valid ? 'success' : 'error'"
			>
				<BInput
					class="text-white dark:text-blue-dark"
					type="text"
					id="companyName"
					v-model="companyName"
				/>
			</BField>
			<BField
				class="col-span-2"
				label="N° Siret"
				labelFor="siret"
				:message="siretError"
				:status="siretMeta.valid ? 'success' : 'error'"
			>
				<BInput class="text-white dark:text-blue-dark" type="text" id="siret" v-model="siret" />
			</BField>
			<BField
				label="Role"
				labelFor="role"
				:message="rolesError"
				:status="rolesMeta.valid ? 'success' : 'error'"
			>
				<Select
					:options="userRolesArray"
					:default="roles ? roles : 'Sélectionnez un Role'"
					@selected="roles = $event"
				/>
			</BField>
			<BField
				label="Abonnement"
				labelFor="subscription"
				:message="subscriptionError"
				:status="subscriptionMeta.valid ? 'success' : 'error'"
			>
				<Select
					:options="subscriptionArray"
					:default="subscription ? subscription : 'Sélectionnez un Abonnement'"
					@selected="subscription = $event"
				/>
			</BField>
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
		<div class="flex items-center justify-center w-full mt-12">
			<BButton
				variant="white"
				class="mt-4 dark:text-black"
				:disabled="!meta.valid || !meta.dirty"
				:loading="isLoading"
				@click="submit"
			>Enregistrer</BButton>
		</div>
	</div>
</template>

<script setup lang='ts'>
import { computed, ref, watch } from 'vue'
import { useEmployeeStore, useEventStore, useUserStore } from '@/store'
import { RoleEnum, userRolesArray, LoaderTypeEnum } from '@/types'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { subscriptionArray, SubscriptionEnum } from '@/store/typesExported'

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

const schema = yup.object({
	companyName: yup.string().nullable().label('Nom de l\'entreprise'),
	email: yup.string().email().required().label('Adresse email'),
	firstName: yup.string().required().label('Prénom'),
	lastName: yup.string().required().label('Nom'),
	siret: yup.string().nullable().label('N° Siret'),
	roles: yup.string().required().label('Role'),
	subscription: yup.string().required().label('Abonnement')
})

const { meta, errors } = useForm({ validationSchema: schema })
const { errorMessage: emailError, value: email, meta: emailMeta } = useField<string>('email', undefined, {
	initialValue: user.value ? user.value.email : '',
})
const { errorMessage: siretError, value: siret, meta: siretMeta } = useField<string>('siret', undefined, {
	initialValue: user.value ? user.value.siret : '',
})
const { errorMessage: companyNameError, value: companyName, meta: companyNameMeta } = useField<string>('companyName', undefined, {
	initialValue: user.value ? user.value.companyName : '',
})
const { errorMessage: firstNameError, value: firstName, meta: firstNameMeta } = useField<string>('firstName', undefined, {
	initialValue: user.value ? user.value.firstName : '',
})
const { errorMessage: lastNameError, value: lastName, meta: lastNameMeta } = useField<string>('lastName', undefined, {
	initialValue: user.value ? user.value.lastName : '',
})
const { value: roles, errorMessage: rolesError, meta: rolesMeta } = useField<RoleEnum | null>('roles', undefined, {
	initialValue: user.value ? user.value.roles : null
})
const { value: subscription, errorMessage: subscriptionError, meta: subscriptionMeta } = useField<SubscriptionEnum | null>('subscription', undefined, {
	initialValue: user.value ? user.value.subscription : null
})

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

const emits = defineEmits<{
	(e: 'submit', id: number): void
}>()

async function submit() {
	isLoading.value = true
	// await userStore.patchOne(props.id, user.value)
	isLoading.value = false
}

</script>