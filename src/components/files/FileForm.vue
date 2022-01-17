<template>
	<div class="container px-4 py-5">
		<div v-if="file && mode === ModalModeEnum.EDIT">
			<img :src="file.secure_url" :alt="file.original_filename" @upload="uploadFile" />
		</div>
		<InputFile v-else-if="mode === ModalModeEnum.CREATE" />

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<BField
				label="Nom du fichier"
				labelFor="name"
				:message="errorName"
				:status="nameMeta.valid ? 'success' : 'error'"
			>
				<BInput
					class="text-black dark:text-gray-800"
					type="text"
					v-model="name"
					placeholder="Nom du fichier"
				/>
			</BField>

			<BField
				label="Type de fichier"
				labelFor="type"
				:message="errorType"
				:status="typeMeta.valid ? 'success' : 'error'"
			>
				<Select
					:options="fileTypeArray"
					:default="type ? type : 'Sélectionnez un Role'"
					@selected="type = $event"
				/>
			</BField>

			<BField
				class="col-span-2"
				label="Description"
				labelFor="description"
				:message="errorDescription"
				:status="descriptionMeta.valid ? 'success' : 'error'"
			>
				<textarea
					class="w-full h-32 min-h-32"
					type="text"
					v-model="description"
					placeholder="Description"
				/>
			</BField>
		</div>
		<div class="flex items-center justify-center mt-10">
			<BButton :disabled="!meta.dirty || !meta.valid" variant="white" @click="submit">Enregistrer</BButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { fileHook } from '@/hooks'
import { useUiStore } from '@/store'
import { FileType, FileTypeEnum, ModalModeEnum, fileTypeArray } from '@/store/typesExported'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

interface Props {
	mode?: ModalModeEnum
	file?: FileType
}

const props = withDefaults(defineProps<Props>(), {
	file: undefined,
	mode: ModalModeEnum.CREATE,
})

const state = reactive<{
	file: null | FormData
}>({
	file: null
})

const { postOne, patchOne } = fileHook()
const { resetUiModalState } = useUiStore()

const schema = yup.object({
	name: yup.string().required('Le nom du fichier est obligatoire').label('Nom du fichier'),
	description: yup.string().label('Description du fichier'),
	type: yup.string().required('Le type du fichier est obligatoire').label('Type du fichier'),
})

const { meta } = useForm({ validationSchema: schema })

const { value: name, errorMessage: errorName, meta: nameMeta } = useField<string>('name', undefined, {
	initialValue: props.file ? props.file.name : '',
})
const { value: description, errorMessage: errorDescription, meta: descriptionMeta } = useField<string>('description', undefined, {
	initialValue: props.file ? props.file.description || '' : '',
})
const { value: type, errorMessage: errorType, meta: typeMeta } = useField<FileTypeEnum>('type', undefined, {
	initialValue: props.file ? props.file.type : FileTypeEnum.MODEL,
})

function uploadFile(fileUploaded: File) {
	const formData = new FormData()
	formData.append('file', fileUploaded)
	formData.append('type', type.value)
	formData.append('name', name.value)
	formData.append('description', description.value)
	state.file = formData
}

async function submit() {

	if (props.mode === ModalModeEnum.CREATE && state.file) {
		await postOne(state.file)
	} else if (props.mode === ModalModeEnum.EDIT) {
		console.log(props.mode, 'props.mode')
		const payload = {
			...props.file,
			name: name.value,
			description: description.value,
			type: type.value,
		} as FileType
		await patchOne(payload)
	}
	resetUiModalState()
}
</script>