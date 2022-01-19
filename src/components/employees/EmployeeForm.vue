<template>
	<div class="w-full h-full px-4 mt-4">
		<form class="grid grid-cols-2 gap-4">
			<BField
				label="Prénom"
				labelFor="firstName"
				:message="firstNameError"
				:status="firstNameMeta.dirty && firstNameMeta.valid ? 'success' : 'error'"
			>
				<BInput class="text-white dark:text-blue-dark" type="text" id="firstName" v-model="firstName" />
			</BField>
			<BField
				label="Nom"
				labelFor="lastName"
				:message="lastNameError"
				:status="lastNameMeta.dirty && lastNameMeta.valid ? 'success' : 'error'"
			>
				<BInput class="text-white dark:text-blue-dark" type="text" id="lastName" v-model="lastName" />
			</BField>
			<BField
				label="E-mail"
				labelFor="email"
				:message="emailError"
				:status="emailMeta.dirty && emailMeta.valid ? 'success' : 'error'"
			>
				<BInput class="text-white dark:text-blue-dark" type="email" id="email" v-model="email" />
			</BField>
			<BField
				label="Téléphone"
				labelFor="phone"
				:message="phoneError"
				:status="phoneMeta.dirty && phoneMeta.valid ? 'success' : 'error'"
			>
				<BInput class="text-white dark:text-blue-dark" type="text" id="phone" v-model="phone" />
			</BField>

			<BField
				v-if="isCurrentUserAdmin && ModalModeEnum.CREATE"
				class="col-span-2"
				label="Utilisateur"
				labelFor="userId"
				:message="userIdError"
				:status="userIdMeta.valid ? 'success' : 'error'"
			>
				<InputSearchSelect baseUrl="user" @selected="userId = $event.id" />
			</BField>
		</form>
		<div class="flex items-center justify-center mt-6">
			<BButton
				variant="white"
				:disabled="!meta.valid || !meta.dirty"
				class="mr-2 dark:text-black"
				@click="submit"
			>{{ mode === ModalModeEnum.CREATE ? 'Créer' : 'Enregistrer' }}</BButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { EmployeeType, ModalModeEnum } from '@/store/typesExported'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore, useEventStore, useEmployeeStore, useUiStore } from '@/store'
import { employeeHook } from '@/hooks'

interface Props {
	employee?: EmployeeType,
	mode?: ModalModeEnum,
	eventId?: number,
	userId?: number,
}

const props = withDefaults(defineProps<Props>(), {
	employee: undefined,
	mode: ModalModeEnum.CREATE,
	eventId: 0,
	userId: 0,
})

const { isCurrentUserAdmin, getCurrentUserId } = useUserStore()
const eventStore = useEventStore()
const { IncLoading, DecLoading } = useUiStore()
const { patchOne, postOne, postManyForEvent  } = employeeHook()

const schema = yup.object({
	email: yup.string().email().required().label('Adresse email'),
	firstName: yup.string().required().label('Prénom'),
	lastName: yup.string().required().label('Nom'),
	phone: yup.string().required().label('Téléphone'),
	userId: yup.number().required().label('Utilisateur'),
})

const userIdField = computed(() => {
	if (props.employee) {
		return props.employee.createdByUser as number
	}
	if (isCurrentUserAdmin) {
		return null
	}
	return getCurrentUserId
})


const { meta } = useForm({ validationSchema: schema })
const { errorMessage: emailError, value: email, meta: emailMeta, setErrors } = useField<string>('email', undefined, {
	initialValue: props.employee ? props.employee.email : '',
})
const { errorMessage: phoneError, value: phone, meta: phoneMeta } = useField<string>('phone', undefined, {
	initialValue: props.employee ? props.employee.phone : '',
})
const { errorMessage: firstNameError, value: firstName, meta: firstNameMeta } = useField<string>('firstName', undefined, {
	initialValue: props.employee ? props.employee.firstName : '',
})
const { errorMessage: lastNameError, value: lastName, meta: lastNameMeta } = useField<string>('lastName', undefined, {
	initialValue: props.employee ? props.employee.lastName : '',
})

const { errorMessage: userIdError, value: userId, meta: userIdMeta } = useField<number | null>('userId', undefined, {
	initialValue: userIdField.value,
})


const emit = defineEmits<{
	(e: 'submit'): void
}>()

async function submit() {
	IncLoading()

	const employeeToPost = {
		email: email.value,
		firstName: firstName.value,
		lastName: lastName.value,
		phone: phone.value,
	} as EmployeeType

	if (props.mode === ModalModeEnum.CREATE) {
		if (props.eventId) {
			const createdByUser = eventStore.getOne(props.eventId)?.createdByUser as number
			await postManyForEvent([employeeToPost],
				props.eventId, createdByUser)
		} else {
			const createdByUser = isCurrentUserAdmin ? userId.value! : getCurrentUserId!
			await postOne(employeeToPost, createdByUser)
		}
	} else if (props.mode === ModalModeEnum.EDIT && props.employee) {
		await patchOne(props.employee.id, { ...employeeToPost, createdByUser: props.employee.createdByUser })
	}
	emit('submit')
	DecLoading()
}
</script>