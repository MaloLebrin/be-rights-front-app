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
			<BInput class="text-white dark:text-blue-dark" type="text" id="postalCode" v-model="postalCode" />
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
		<BField
			v-if="isCurrentUserAdmin"
			label="Utilisateur"
			labelFor="userId"
			:message="userIdError"
			:status="userIdMeta.valid ? 'success' : 'error'"
		>
			<BInput class="text-white dark:text-blue-dark" type="text" id="userId" v-model="userId" />
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
</template>
<script setup lang='ts'>
import { useEventStore, useUserStore } from '@/store'
import { ModalModeEnum } from '@/store/typesExported'
import { useField, useForm } from 'vee-validate'
import { computed } from 'vue'
import * as yup from 'yup'

interface Props {
	eventId?: number
	mode?: ModalModeEnum
}
const props = withDefaults(defineProps<Props>(), {
	eventId: undefined,
	mode: undefined,
})

const eventStore = useEventStore()
const userStore = useUserStore()
const { isCurrentUserAdmin } = userStore

const event = computed(() => eventStore.getOne(props.eventId))

const schema = yup.object({
	name: yup.string().required().label('Nom'),
})

const { meta, errors } = useForm({ validationSchema: schema })
const { errorMessage: nameError, value: name, meta: nameMeta } = useField<string>('Nom', undefined, {
	initialValue: event.value ? event.value.name : '',
})
const { errorMessage: addressError, value: address, meta: addressMeta } = useField<string | null>('Adresse', undefined, {
	initialValue: event.value ? event.value.address : '',
})
const { errorMessage: postalCodeError, value: postalCode, meta: postalCodeMeta } = useField<string | null>('Code postal', undefined, {
	initialValue: event.value ? event.value.postalCode : '',
})
const { errorMessage: cityError, value: city, meta: cityMeta } = useField<string | null>('Ville', undefined, {
	initialValue: event.value ? event.value.city : '',
})
const { errorMessage: countryError, value: country, meta: countryMeta } = useField<string | null>('Pays', undefined, {
	initialValue: event.value ? event.value.country : '',
})
const { errorMessage: userIdError, value: userId, meta: userIdMeta } = useField<number | null>('Utilisateur', undefined, {
	initialValue: event.value ? event.value.userId : '',
})

async function submit() {
	return
}
</script>