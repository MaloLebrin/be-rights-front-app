<template>
  <div class="container px-4 space-y-6">
    <BaseMessage
      type="warning"
      v-if="mode === ModalModeEnum.CREATE"
    >Vous devez enregister votre nouvelle image en cliquant sur le bouton "Enregistrer"</BaseMessage>

    <div v-if="file && mode === ModalModeEnum.EDIT">
      <img :src="file.secure_url" :alt="file.original_filename" />
    </div>

    <InputFile v-else-if="mode === ModalModeEnum.CREATE" @uploadFile="uploadOneFile" />

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
    </div>
    <div class="flex items-center justify-center mt-10">
      <BButton :disabled="!meta.dirty || !meta.valid" variant="white" @click="submit">
        <template #icon>
          <SaveIconOutline />
        </template>
        Enregistrer
      </BButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUiStore, useUserStore } from '@/store'
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

const { isCurrentUserAdmin } = useUserStore()
const { postOne, patchOne } = fileHook()
const { resetUiModalState, IncLoading, DecLoading } = useUiStore()

const schema = yup.object({
  name: yup.string().required('Le nom du fichier est obligatoire').label('Nom du fichier'),
  description: yup.string().label('Description du fichier'),
  type: yup.string().required('Le type du fichier est obligatoire').label('Type du fichier'),
  userId: yup.number().required('L\'id de l\'utilisateur est requis').label('Utilisateur'),
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

const { value: userId, errorMessage: userIdError, meta: userIdMeta } = useField<number>('userId', undefined, {
  initialValue: props.file ? props.file.createdByUser : 0,
})

function uploadOneFile(fileUploaded: File) {
  const formData = new FormData()
  formData.append('file', fileUploaded)
  state.file = formData
}

async function submit() {
  IncLoading()

  if (props.mode === ModalModeEnum.CREATE && state.file) {
    state.file.append('type', type.value)
    state.file.append('name', name.value)
    state.file.append('description', description.value)
    if (isCurrentUserAdmin) {
      await postOne(state.file, userId.value)
    } else {
      await postOne(state.file)
    }
  } else if (props.mode === ModalModeEnum.EDIT) {

    const payload = {
      ...props.file,
      name: name.value,
      description: description.value,
      type: type.value,
    } as FileType
    await patchOne(payload)
  }
  DecLoading()
  state.file = null
  resetUiModalState()
}
</script>