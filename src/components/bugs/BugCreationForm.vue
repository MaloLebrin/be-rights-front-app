<template>
  <form class="grid grid-cols-1 gap-4">
    <BField
      label="Nom du bug ou de la remarque"
      labelFor="name"
      :message="errorName"
      :status="metaName.valid ? 'success' : 'error'"
    >
      <BInput class="w-full" type="test" v-model="name" id="name" />
    </BField>

    <BField
      label="Url de la page"
      labelFor="url"
      :message="errorUrl"
      :status="metaUrl.valid ? 'success' : 'error'"
    >
      <BInput class="w-full" v-model="url" />
    </BField>

    <BField
      label="Description"
      labelFor="description"
      :message="errorDescription"
      :status="metaDescription.valid ? 'success' : 'error'"
    >
      <BaseTextarea v-model="description" placeholder="Description" />
    </BField>

    <div class="flex items-center space-x-2">
      <BButton :disaled="!meta.valid || !meta.dirty">
        <template #icon>
          <PaperAirplaneIconOutline class="w-6 h-6" />
        </template>
        <span>Envoyer</span>
      </BButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useBugStore } from '@/store'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

const bugStore = useBugStore()
const { getCreationForm } = storeToRefs(bugStore)

const schema = yup.object({
  name: yup.string().required('Le nom est obligatoire'),
  url: yup.string().url('L\'url est invalide'),
  description: yup.string().required('La description est obligatoire'),
})

const { meta } = useForm({ validationSchema: schema })

const { errorMessage: errorName, value: name, meta: metaName } = useField<string>('name', undefined, {
  initialValue: getCreationForm.value.name,
})

const { errorMessage: errorUrl, value: url, meta: metaUrl } = useField<string>('url', undefined, {
  initialValue: getCreationForm.value.url,
})

const { errorMessage: errorDescription, value: description, meta: metaDescription } = useField<string>('description', undefined, {
  initialValue: getCreationForm.value.description,
})
</script>