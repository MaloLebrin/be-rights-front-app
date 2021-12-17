<template>
	<div class="flex flex-col items-center h-full bg-white">
		<div class="mb-6 mt-10">
			<h1 class="text-black dark:text-white">Bienvenue sur</h1>
			<SimpleLogo />
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
			<div class="flex items-center">
				<input
					:id="RoleEnum.PHOTOGRAPHER"
					v-model="form.roles"
					:value="RoleEnum.PHOTOGRAPHER"
					:name="RoleEnum.PHOTOGRAPHER"
					type="radio"
					class="h-4 w-4 mr-2 border-gray-300 rounded-full text-green focus:ring-green"
				/>
				<label
					:for="RoleEnum.PHOTOGRAPHER"
					class="ml-2 block text-sm text-gray-900"
				>je suis un photographe ou agence de photographie</label>
			</div>
			<div class="flex items-center">
				<input
					:id="RoleEnum.COMPANY"
					v-model="form.roles"
					:value="RoleEnum.COMPANY"
					:name="RoleEnum.COMPANY"
					type="radio"
					class="h-4 w-4 mr-2 border-gray-300 rounded-full text-green focus:ring-green"
				/>
				<label
					:for="RoleEnum.COMPANY"
					class="ml-2 block text-sm text-gray-900"
				>je suis une enteprise ou un particulier</label>
			</div>

			<BField class="col-span-2" label="Nom de l'entreprise">
				<BInput type="text" class="text-black" v-model="form.companyName" />
			</BField>

			<BField label="Prénom">
				<BInput type="text" class="text-black" v-model="form.firstName" />
			</BField>
			<BField label="Nom">
				<BInput type="text" class="text-black" v-model="form.lastName" />
			</BField>
			<BField class="col-span-2" label="Address e-mail">
				<BInput type="email" class="text-black" v-model="form.email" />
			</BField>
			<BField class="col-span-2" label="Mot de passe">
				<BInput type="password" class="text-black" v-model="form.password" />
			</BField>

			<div class="col-span-2 flex flex-col justify-center items-center">
				<BButton class="mb-8" variant="danger" @click="submitregister">S'inscrire</BButton>
				<BLink tag="router-link" to="/login">J'ai déjà un compte</BLink>
			</div>
		</div>
	</div>
</template>

<script setup lang='ts'>
import { reactive } from 'vue'
import { userHook } from '@/hooks'
import { RoleEnum } from '@/types'

const { register } = userHook()

const form = reactive({
	companyName: '',
	email: '',
	password: '',
	firstName: '',
	lastName: '',
	roles: RoleEnum.PHOTOGRAPHER
})

async function submitregister() {
	await register(form)
}


</script>