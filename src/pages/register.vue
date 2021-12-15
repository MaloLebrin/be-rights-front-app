<template>
	<div class="flex flex-col items-center h-full w-full
	bg-white">
			<BField label="Address e-mail">
				<BInput
					type="email"
					class="text-black"
					v-model="form.email"
				/>
			</BField>
			<BField label="Mot de passe">
				<BInput
					type="password"
					class="text-black"
					v-model="form.password"
				/>
			</BField>
			<div class="grid grid-cols-1 gap-4">
				<BButton
					variant="danger"
					@click="submitregister"
				>S'inscrire</BButton>
				<BLink
					tag="router-link"
					to="/login"
				>
					J'ai déjà un compte
				</BLink>

			</div>
	</div>
</template>
<script setup lang='ts'>
import { computed, reactive } from 'vue'
import { userHook } from '@/hooks'

const form = reactive({
	email: '',
	password: '',
	firstName: '',
	lastName: '',

})

async function submitregister() {
	// await login({ email: form.email, password: form.password })
}


</script>