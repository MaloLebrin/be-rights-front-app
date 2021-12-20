<template>
	<div class="mt-4 px-6 w-full h-full">
		<BField
			label="Prénom"
			labelFor="name"
			:message="nameError"
			:status="nameMeta.valid ? 'success' : 'error'"
		>
			<BInput class="text-white dark:text-blue-dark" type="text" id="name" v-model="name" />
		</BField>
	</div>
</template>
<script setup lang='ts'>
import { useEventStore } from '@/store'
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

const event = computed(() => eventStore.getOne(props.eventId))

const schema = yup.object({
	name: yup.string().required().label('Nom'),
})

const { meta, errors } = useForm({ validationSchema: schema })
const { errorMessage: nameError, value: name, meta: nameMeta } = useField<string>('Nom', undefined, {
	initialValue: event.value ? event.value.name : '',
})

</script>