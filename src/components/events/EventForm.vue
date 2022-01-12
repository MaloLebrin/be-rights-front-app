<template>
	<form class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 px-6 w-full h-full">
		<BField
			class="col-span-2"
			label="Nom de l'événement"
			labelFor="name"
			:message="nameError"
			:status="nameMeta.valid ? 'success' : 'error'"
		>
			<BInput class="text-white dark:text-blue-dark" type="text" id="name" v-model="name" />
		</BField>
		<BField
			class
			label="Dates"
			labelFor="dates"
			:message="datesError"
			:status="datesMeta.valid ? 'success' : 'error'"
		>
			<v-date-picker
				v-model="period"
				mode="dateTime"
				:is-dark="isDarkTheme"
				is-range
				is24hr
				is-expanded
			/>
		</BField>

		<div>
			<BField
				label="Adresse"
				labelFor="address"
				:message="addressError"
				:status="addressMeta.valid ? 'success' : 'error'"
			>
				<BInput class="text-white dark:text-blue-dark" type="text" id="address" v-model="address" />
			</BField>
			<BField
				label="Code postal"
				labelFor="postalCode"
				:message="postalCodeError"
				:status="postalCodeMeta.valid ? 'success' : 'error'"
			>
				<BInput
					class="text-white dark:text-blue-dark"
					type="text"
					id="postalCode"
					v-model="postalCode"
				/>
			</BField>
			<BField
				label="Ville"
				labelFor="city"
				:message="cityError"
				:status="cityMeta.valid ? 'success' : 'error'"
			>
				<BInput class="text-white dark:text-blue-dark" type="text" id="city" v-model="city" />
			</BField>
			<BField
				label="Pays"
				labelFor="country"
				:message="countryError"
				:status="countryMeta.valid ? 'success' : 'error'"
			>
				<BInput class="text-white dark:text-blue-dark" type="text" id="country" v-model="country" />
			</BField>
		</div>
		<BField
			v-if="isCurrentUserAdmin"
			class="col-span-2"
			label="Utilisateur"
			labelFor="userId"
			:message="userIdError"
			:status="userIdMeta.valid ? 'success' : 'error'"
		>
			<InputSearchSelect baseUrl="user" @selected="userId = $event.id" />
		</BField>
		<BField
			class="col-span-2"
			label="Destinataires"
			labelFor="employee"
			:message="employeeError"
			:status="employeeMeta.valid ? 'success' : 'error'"
		>
			<InputSearchSelect baseUrl="employee" @selected="employees = $event" is-multiple />
		</BField>
	</form>
	<div class="flex items-center justify-center mt-6">
		<BButton
			:disabled="!meta.valid || !meta.dirty"
			variant="white"
			class="mr-2 dark:text-black"
			@click="submit"
		>{{ mode === ModalModeEnum.CREATE ? 'Créer' : 'Enregistrer' }}</BButton>
	</div>
</template>

<script setup lang="ts">
import { answerHook, eventHook } from '@/hooks'
import { useEventStore, useMainStore, useUiStore, useUserStore } from '@/store'
import { EmployeeType, EventType, ModalModeEnum } from '@/store/typesExported'
import { Period } from '@/types'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

interface Props {
	eventId?: number
	mode?: ModalModeEnum
}
const props = withDefaults(defineProps<Props>(), {
	eventId: undefined,
	mode: undefined,
})

const mainStore = useMainStore()
const eventStore = useEventStore()
const userStore = useUserStore()
const uiStore = useUiStore()
const { isDarkTheme } = mainStore
const { isCurrentUserAdmin, getCurrent } = userStore
const { getUiModalState } = uiStore
const { postMany: postManyAnswers } = answerHook()
const { postOne: PostOneEvent } = eventHook()

const event = computed(() => eventStore.getOne(props.eventId))

const schema = yup.object({
	name: yup.string().required().label('Nom'),
	period: yup.object().shape({
		start: yup.date().required().label('Début'),
		end: yup.date().required().label('Fin'),
	}).required().label('Dates'),
	address: yup.string().required().label('Adresse'),
	postalCode: yup.string().required().label('Code postal'),
	city: yup.string().required().label('Ville'),
	country: yup.string().required().label('Pays'),
	userId: yup.number().required().label('Utilisateur'),
})

const { meta } = useForm({ validationSchema: schema })

const { errorMessage: nameError, value: name, meta: nameMeta } = useField<string>('name', undefined, {
	initialValue: event.value ? event.value.name : '',
})
const { errorMessage: datesError, meta: datesMeta, value: period } = useField<Period>('period', undefined, {
	initialValue: event.value ? { start: event.value.start, end: event.value.end } : { start: new Date(), end: new Date() },
})
const { errorMessage: addressError, value: address, meta: addressMeta } = useField<string | null>('address', undefined, {
	initialValue: event.value ? event.value.address : '',
})
const { errorMessage: postalCodeError, value: postalCode, meta: postalCodeMeta } = useField<string | null>('postalCode', undefined, {
	initialValue: event.value ? event.value.postalCode : '',
})
const { errorMessage: cityError, value: city, meta: cityMeta } = useField<string | null>('city', undefined, {
	initialValue: event.value ? event.value.city : '',
})
const { errorMessage: countryError, value: country, meta: countryMeta } = useField<string | null>('country', undefined, {
	initialValue: event.value ? event.value.country : '',
})
const { errorMessage: userIdError, value: userId, meta: userIdMeta } = useField<number | null>('userId', undefined, {
	initialValue: event.value ? event.value.createdByUser : '',
})

const { errorMessage: employeeError, value: employees, meta: employeeMeta } = useField<EmployeeType[] | null>('employees', undefined, {
	initialValue: event.value ? event.value.employees : '',
})

const userCreateEvent = computed(() => {
	if (isCurrentUserAdmin) {
		return userId.value
	} else {
		return getCurrent?.id
	}
})

async function submit() {

	const payload = {
		name: name.value,
		start: period.value.start,
		end: period.value.end,
		address: address.value,
		postalCode: postalCode.value,
		city: city.value,
		country: country.value,
		createdByUser: userCreateEvent.value,
	}

	if (getUiModalState.modalMode === ModalModeEnum.CREATE) {
		const newEvent = await PostOneEvent(payload as EventType, userCreateEvent.value!)
		if (employees.value && employees.value.length > 0 && newEvent) {
			const employeesIds = employees.value.map(employee => employee.id)
			const eventId = newEvent.id
			await postManyAnswers(
				eventId,
				employeesIds
			)
		}
	}
	if (getUiModalState.modalMode === ModalModeEnum.EDIT) {
		// await PostOneEvent(payload as EventType, userCreateEvent.value!, props.eventId!)
		if (employees.value && employees.value.length > 0) {
			// const employeesIds = employees.value.map(employee => employee.id)
			// const eventId = props.eventId!
			// await postManyAnswers(
			// 	eventId,
			// 	employeesIds
			// )
		}
	}
}
</script>