<template>
	<div class="mt-4 px-4 w-full h-full">
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
		</form>
		<div class="flex items-center justify-center mt-6">
			<BButton
				variant="white"
				:disabled="!meta.valid || !meta.dirty"
				class="mr-2 dark:text-black"
				@click="submit"
			>{{ mode === 'create' ? 'Créer' : 'Enregistrer' }}</BButton>
		</div>
	</div>
</template>

<script setup lang='ts'>
import { EmployeeType } from '@/store/typesExported'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

interface Props {
	employee?: EmployeeType,
	mode?: 'create' | 'update' | 'delete',
	eventId?: number,
	userId?: number,
}

const props = withDefaults(defineProps<Props>(), {
	employee: undefined,
	mode: 'create',
	eventId: 0,
	userId: 0,
})

const schema = yup.object({
	email: yup.string().email().required().label('Adresse email'),
	firstName: yup.string().required().label('Prénom'),
	lastName: yup.string().required().label('Nom'),
	phone: yup.string().required().label('Téléphone'),
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


const emit = defineEmits<{
	(e: 'submit'): void
}>()

async function submit() {
	emit('submit')
	if (props.eventId) {

	} else if (props.userId) {

	}
}
</script>