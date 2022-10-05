<template>
<form class="grid grid-cols-1 gap-4 md:grid-cols-2">
  <div class="space-y-2 md:col-span-2">
    <label
      class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
    >Nom du bug ou de la remarque&nbsp;:</label>
    <BaseInput
      id="name"
      v-model="name"
      type="text"
      :error="errorName"
      @update:modelValue="setCreationFormField('name', name)"
    />
  </div>
  <div class="space-y-2">
    <label class="block mb-2 text-lg font-bold text-blue dark:text-gray-100">Url de la page&nbsp;:</label>
    <BaseInput
      v-model="url"
      :error="errorUrl"
      @update:modelValue="setCreationFormField('url', url)"
    />
  </div>

  <div class="space-y-2">
    <label
      class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
    >Type de Bug/problème&nbsp;:</label>
    <Listbox
      v-model="type"
      @update:modelValue="setCreationFormField('type', type)"
    >
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full py-4 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
        >
          <span class="block truncate">{{ getBugReportTypeTranslation(type) }}</span>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
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
            class="absolute w-full mt-1 space-y-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-for="(bugType, index) in BUGS_REPORTS_TYPE_ARRAY"
              v-slot="{ active, selected }"
              :key="index"
              :value="bugType"
              as="template"
            >
              <li
                class="relative py-2 pl-10 pr-4 cursor-default select-none hover:cursor-pointer hover:bg-gray-50"
                :class="[
                  active ? 'text-amber-900 bg-amber-100' : 'text-gray-900',
                ]"
              >
                <span
                  class="block truncate"
                  :class="[selected ? 'font-medium' : 'font-normal']"
                >
                  {{ getBugReportTypeTranslation(bugType) }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIconOutline
                    class="w-6 h-6"
                    aria-hidden="true"
                  />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>

  <div class="space-y-2">
    <label class="block mb-2 text-lg font-bold text-blue dark:text-gray-100">Description&nbsp;:</label>
    <BaseTextarea
      v-model="description"
      class="w-full h-60"
      placeholder="Description"
      :error="errorDescription"
      @update:modelValue="setCreationFormField('description', description)"
    />
  </div>

  <div class="space-y-4">
    <label
      class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
    >Ajouter une capture d'écran&nbsp;:</label>
    <FormsInputFile @uploadFile="uploadFile" />
  </div>

  <div class="flex items-center justify-center col-span-2 mt-6 space-x-6">
    <BaseButton @click="goBack">
      <template #icon>
        <BackspaceIconOutline class="w-6 h-6" />
      </template>
      <span>Retour</span>
    </BaseButton>
    <BaseButton
      :disabled="!meta.valid || !meta.dirty"
      @click="submitBugReport"
    >
      <template #icon>
        <PaperAirplaneIconOutline class="w-6 h-6" />
      </template>
      <span>Envoyer</span>
    </BaseButton>
  </div>
</form>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { object, string } from 'yup'
import type { BugReportTypeEnum } from '@/types'
import { BUGS_REPORTS_TYPE_ARRAY, FileTypeEnum } from '@/types'
import { useUiStore, useUserStore } from '~~/store'
import { useBugStore } from '~~/store/bug'
const router = useRouter()

const bugStore = useBugStore()
const { resetCreationForm, setCreationFormField } = bugStore
const { DecLoading, IncLoading } = useUiStore()
const userStore = useUserStore()

const { getBugReportTypeTranslation, postOne: postOneBug } = bugReportsHook()
const { postOne: postOneFile } = fileHook()

interface State {
  file: FormData | null
}

const state = reactive<State>({
  file: null,
})

const schema = object({
  name: string().required('Le nom est obligatoire'),
  url: string().url('L\'url est invalide'),
  description: string().required('La description est obligatoire'),
})

const { meta } = useForm({ validationSchema: schema })

const { errorMessage: errorName, value: name } = useField<string>('name', undefined, {
  initialValue: bugStore.getCreationForm.name,
})

const { errorMessage: errorUrl, value: url } = useField<string>('url', undefined, {
  initialValue: bugStore.getCreationForm.url,
})

const { errorMessage: errorDescription, value: description } = useField<string>('description', undefined, {
  initialValue: bugStore.getCreationForm.description,
})

const { value: type } = useField<BugReportTypeEnum>('type', undefined, {
  initialValue: bugStore.getCreationForm.type,
})

function goBack() {
  router.go(-1)
}

function uploadFile(fileUploaded: File) {
  const formData = new FormData()
  formData.append('file', fileUploaded)
  formData.append('type', FileTypeEnum.BUG_REPORT)
  formData.append('userId', userStore.getCurrentUserId!.toString())
  formData.append('name', `screenshot${Math.random()}`)
  formData.append('description', 'bug report help')
  state.file = formData
}

async function submitBugReport() {
  IncLoading()
  let fileId = null
  if (state.file) {
    const file = await postOneFile(state.file)
    fileId = file.id
  }
  const bugReport = {
    ...bugStore.getCreationForm,
    file: fileId,
  }
  await postOneBug(bugReport)
  resetCreationForm()
  DecLoading()
}
</script>
