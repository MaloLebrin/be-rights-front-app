<template>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-8 py-8">
		<div class="flex flex-col items-center h-full">
			<div class="mb-6 mt-10">
				<h1 class="text-black dark:text-white">Bienvenue sur</h1>
				<SimpleLogo />
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
				<div class="flex items-center">
					<input
						:id="RoleEnum.PHOTOGRAPHER"
						v-model="roles"
						:value="RoleEnum.PHOTOGRAPHER"
						:name="RoleEnum.PHOTOGRAPHER"
						type="radio"
						class="h-4 w-4 mr-2 border-gray-300 rounded-full text-green focus:ring-green"
					/>
					<label
						:for="RoleEnum.PHOTOGRAPHER"
						class="ml-2 block text-sm text-gray-900 dark:text-white"
					>je suis un photographe ou agence de photographie</label>
				</div>
				<div class="flex items-center">
					<input
						:id="RoleEnum.COMPANY"
						v-model="roles"
						:value="RoleEnum.COMPANY"
						:name="RoleEnum.COMPANY"
						type="radio"
						class="h-4 w-4 mr-2 border-gray-300 rounded-full text-green focus:ring-green"
					/>
					<label
						:for="RoleEnum.COMPANY"
						class="ml-2 block text-sm text-gray-900 dark:text-white"
					>je suis une enteprise ou un particulier</label>
				</div>

				<BField
					class="col-span-2"
					label="Nom de l'entreprise"
					:message="companyNameError"
					:status="companyNameMeta.dirty && companyNameMeta.valid ? 'success' : 'error'"
				>
					<BInput type="text" class="text-black" v-model="companyName" />
				</BField>

				<BField
					label="Prénom"
					:message="firstNameError"
					:status="firstNameMeta.dirty && firstNameMeta.valid ? 'success' : 'error'"
				>
					<BInput type="text" class="text-black" v-model="firstName" />
				</BField>
				<BField
					label="Nom"
					:message="lastNameError"
					:status="lastNameMeta.dirty && lastNameMeta.valid ? 'success' : 'error'"
				>
					<BInput type="text" class="text-black" v-model="lastName" />
				</BField>
				<BField
					class="col-span-2"
					label="Address e-mail"
					:message="emailError"
					:status="emailMeta.dirty && emailMeta.valid ? 'success' : 'error'"
				>
					<BInput type="email" class="text-black" v-model="email" />
				</BField>
				<BField
					class="col-span-2"
					label="Mot de passe"
					:message="passwordError"
					:status="passwordMeta.dirty && passwordMeta.valid ? 'success' : 'error'"
				>
					<BInput type="password" class="text-black" v-model="password" />
				</BField>

				<div class="col-span-2 flex flex-col justify-center items-center">
					<BButton
						:variant="isDarkTheme ? 'white' : 'primary'"
						:disabled="!meta.valid || !meta.dirty"
						:class="['mb-8', { 'cursor-not-allowed opacity-70': !meta.valid || !meta.dirty }]"
						:isLoading="isLoading"
						@click="submitregister"
					>S'inscrire</BButton>
					<BLink class="dark:text-white" tag="router-link" to="/login">J'ai déjà un compte</BLink>
				</div>
			</div>
		</div>
		<img
			class="shadow-2xl TranslateUpAnimation cursor-none hidden md:block max-w-5xl object-cover w-2/3"
			src="@/assets/camera.jpg"
			alt="camera picture"
		/>
	</div>
</template>

<script setup lang='ts'>
import { userHook } from '@/hooks'
import { useMainStore } from '@/store'
import { RoleEnum } from '@/types'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
const { register } = userHook()
const mainStore = useMainStore()
const { isDarkTheme } = mainStore

const schema = yup.object({
	companyName: yup.string().required().label('Nom de l\'entreprise'),
	email: yup.string().email().required().label('Adresse email'),
	password: yup.string().required().label('Mot de passe'),
	firstName: yup.string().required().label('Prénom'),
	lastName: yup.string().required().label('Nom'),
	roles: yup.string().required()
})

const isLoading = ref(false)

const { meta } = useForm({ validationSchema: schema })
const { errorMessage: emailError, value: email, meta: emailMeta, setErrors } = useField<string>('email')
const { errorMessage: passwordError, value: password, meta: passwordMeta } = useField<string>('password')
const { errorMessage: companyNameError, value: companyName, meta: companyNameMeta } = useField<string>('companyName')
const { errorMessage: firstNameError, value: firstName, meta: firstNameMeta } = useField<string>('firstName')
const { errorMessage: lastNameError, value: lastName, meta: lastNameMeta } = useField<string>('lastName')
const { value: roles } = useField<RoleEnum>('roles', undefined, { initialValue: RoleEnum.COMPANY })


async function submitregister() {
	isLoading.value = true
	await register({
		email: email.value,
		password: password.value,
		companyName: companyName.value,
		firstName: firstName.value,
		lastName: lastName.value,
		roles: roles.value,
	})
	isLoading.value = false
}


</script>