<template>
<div class="container px-4 space-y-6">
  <BaseMessage
    v-if="mode === ModalModeEnum.CREATE"
    type="warning"
  >
    Vous devez enregister votre nouvelle image en cliquant sur le bouton "Enregistrer"
  </BaseMessage>

  <div v-if="file && mode === ModalModeEnum.EDIT">
    <img
      :src="file.secure_url"
      :alt="file.original_filename"
    >
  </div>

  <InputFile
    v-else-if="mode === ModalModeEnum.CREATE"
    @uploadFile="uploadOneFile"
  />

  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div class="space-y-2">
      <label
        class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
      >Nom du fichier&nbsp;*&nbsp;:</label>
      <BaseInput
        id="name"
        v-model="name"
        class="text-white dark:text-blue-dark"
        type="text"
        :error="errorName"
      />
    </div>

    <div class="space-y-2">
      <label
        class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
      >Type du fichier&nbsp;*&nbsp;:</label>
      <Select
        :options="fileTypeArray"
        :default="type ? type : 'Sélectionnez un Role'"
        @selected="handleFileType"
      />
      <p
        v-if="errorType?.length"
        class="text-sm text-red-500"
      >
        {{ errorType }}
      </p>
    </div>

    <div class="space-y-2 md:col-span-2">
      <label class="block mb-2 text-lg font-bold text-blue dark:text-gray-100">Description&nbsp;:</label>
      <BaseTextarea
        v-model="description"
        class="w-full"
        :error="errorDescription"
      />
    </div>

    <div
      v-if="isCurrentUserAdmin && ModalModeEnum.CREATE"
      class="space-y-2 md:col-span-2"
    >
      <label
        class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
      >Id de l'utilisateur&nbsp;*&nbsp;:</label>
      <InputSearchSelect
        base-url="user"
        @selected="addUserId"
      />
      <p
        v-if="userIdError?.length"
        class="text-sm text-red-500"
      >
        {{ userIdError }}
      </p>
    </div>
  </div>

  <div class="flex items-center justify-center mt-10">
    <BaseButton
      :disabled="!meta.dirty || !meta.valid"
      @click="submit"
    >
      <template #icon>
        <SaveIconOutline />
      </template>
      Enregistrer
    </BaseButton>
  </div>
</div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { number, object, string } from 'yup'
import type { FileType, UserType } from '@/types/typesExported'
import { FileTypeEnum, ModalModeEnum, fileTypeArray } from '@/types/typesExported'

interface Props {
  mode?: ModalModeEnum
  file?: FileType | null
}

const props = withDefaults(defineProps<Props>(), {
  file: null,
  mode: ModalModeEnum.CREATE,
})

const state = reactive<{
  file: null | FormData
}>({
  file: null,
})

const { isCurrentUserAdmin } = useUserStore()
const { postOne, patchOne } = fileHook()
const { resetUiModalState, IncLoading, DecLoading } = useUiStore()

const schema = object({
  name: string().required('Le nom du fichier est obligatoire'),
  description: string().label('Description du fichier'),
  type: string().required('Le type du fichier est obligatoire'),
  userId: number().required('L\'id de l\'utilisateur est requis'),
})

const { meta } = useForm({ validationSchema: schema })

const { value: name, errorMessage: errorName } = useField<string>('name', undefined, {
  initialValue: props.file ? props.file.name : '',
})
const { value: description, errorMessage: errorDescription } = useField<string>('description', undefined, {
  initialValue: props.file ? props.file.description || '' : '',
})
const { value: type, errorMessage: errorType, handleChange: handleFileType } = useField<FileTypeEnum>('type', undefined, {
  initialValue: props.file ? props.file.type : FileTypeEnum.MODEL,
})

const { value: userId, errorMessage: userIdError, handleChange: handleUserId } = useField<number>('userId', undefined, {
  initialValue: props.file ? props.file.createdByUser : 0,
})

function addUserId(user: UserType) {
  handleUserId(user.id)
}

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
