<template>
	<div class="mt-4 px-4 w-full h-full">
		<form
			class="grid grid-cols-2 gap-4"
		>
			<BField label="Prénom" labelFor="firstName">
				<BInput
					class="text-white dark:text-blue-dark"
					type="text"
					id="firstName"
					v-model="form.firstName"
				/>
			</BField>
			<BField label="Nom" labelFor="lastName">
				<BInput
					class="text-white dark:text-blue-dark"
					type="text"
					id="lastName"
					v-model="form.lastName"
				/>
			</BField>
			<BField label="E-mail" labelFor="email">
				<BInput
					class="text-white dark:text-blue-dark"
					type="email"
					id="email"
					v-model="form.email"
				/>
			</BField>
			<BField label="Téléphone" labelFor="phone">
				<BInput
					class="text-white dark:text-blue-dark"
					type="text"
					id="phone"
					v-model="form.phone"
				/>
			</BField>
		</form>
		<div class="flex items-center justify-center mt-6">
			<BButton
				class="mr-2 dark:text-black"
				@click="submit"
			>
				{{ mode === 'create' ? 'Créer' : 'Enregistrer' }}
			</BButton>
		</div>
	</div>
</template>

<script setup lang='ts'>
import { reactive } from 'vue'
import { EmployeeType } from '@/store/typesExported'

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

const form = reactive({
	email: props.employee ? props.employee.email : '',
	firstName: props.employee ? props.employee.firstName : '',
	lastName: props.employee ? props.employee.lastName : '',
	phone: props.employee ? props.employee.phone : '',
	event: props.eventId,
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