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
        type="text"
        :error="errorName"
      />
    </div>

    <div class="space-y-2">
      <label
        class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
      >Type du fichier&nbsp;*&nbsp;:</label>
      <Listbox v-model="type">
        <div class="relative mt-1">
          <ListboxButton
            class="relative w-full py-3 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
          >
            <span class="block truncate">{{ getTranslationFileType(type) }}</span>
            <span
              class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
            >
              <ArrowsUpDownIconOutline
                class="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute z-10 w-full py-2 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <ListboxOption
                v-for="fileType in fileTypeArray"
                v-slot="{ active, selected }"
                :key="fileType"
                :value="fileType"
                as="template"
              >
                <li
                  class="relative py-2 pl-10 pr-4 cursor-default select-none"
                  :class="[
                    active ? 'text-amber-900 bg-amber-100' : 'text-gray-900',
                  ]"
                >
                  <span
                    class="block truncate"
                    :class="[
                      selected ? 'font-medium' : 'font-normal',
                    ]"
                  >{{ getTranslationFileType(fileType) }}</span>
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                  >
                    <CheckIconOutline
                      class="w-5 h-5"
                      aria-hidden="true"
                    />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
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
      v-if="userStore.isCurrentUserAdmin && ModalModeEnum.CREATE"
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
        <ArrowDownOnSquareIconOutline />
      </template>
      Enregistrer
    </BaseButton>
  </div>
</div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { number, object, string } from 'yup'
import type { FileType, UserType } from '@/types'
import { FileTypeEnum, ModalModeEnum, fileTypeArray } from '@/types'

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

const userStore = useUserStore()
const { postOne, patchOne, getTranslationFileType } = fileHook()
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
const { value: type, errorMessage: errorType } = useField<FileTypeEnum>('type', undefined, {
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
    if (userStore.isCurrentUserAdmin) {
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
