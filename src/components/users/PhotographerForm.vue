<template>
<Form
  v-slot="{ meta, isSubmitting }"
  :validation-schema="schema"
  :initial-values="initialValues"
  class="grid w-full grid-cols-1 gap-6 mt-4 md:gap-12 md:grid-cols-2 mb-36"
  @submit="submit"
>
  <BaseInput
    label="Prénom"
    name="firstName"
    type="text"
    autocomplete="firstName"
    is-required
  />
  <BaseInput
    label="Nom"
    name="lastName"
    type="text"
    autocomplete="lastName"
    is-required
  />

  <BaseInput
    label="Adresse email"
    name="email"
    type="email"
    autocomplete="email"
    is-required
  />
  <BaseInput
    label="Nom de l'entreprise"
    name="companyName"
    type="text"
    autocomplete="companyName"
    is-required
  />
  <div class="flex items-center justify-center mt-6 md:col-span-2">
    <BaseButton
      :disabled="!meta.valid || !meta.dirty"
      :is-loading="uiStore.getUIIsLoading || isSubmitting"
      type="submit"
    >
      <template #icon>
        <ArrowDownOnSquareIconOutline />
      </template>
      Enregistrer
    </BaseButton>
  </div>
</Form>
</template>

<script setup lang="ts">
import type { InferType } from 'yup'
import { object, string } from 'yup'
import type { UserType, VeeValidateValues } from '@/types'

interface IForm extends InferType<typeof schema> {}

interface Props {
  eventId?: number | null
  employeeId?: number | null
  userId?: number | null
  photographer?: UserType | null
}

const props = withDefaults(defineProps<Props>(), {
  eventId: null,
  photographer: null,
})

const emit = defineEmits<{
  (e: 'submitted', photographerPayoad: UserType): void
}>()

const uiStore = useUiStore()
const { setPhotographerForm } = useUserStore()
const { IncLoading, DecLoading, resetUiModalState } = uiStore
const { patchOne } = userHook()
const router = useRouter()

const schema = object({
  email: string().email('vous devez entrer in email valide').required('L\'adresse email est requise'),
  firstName: string().required('Le prenom est requis'),
  lastName: string().required('Le nom est requis'),
  companyName: string().nullable(),
})

const initialValues = {
  email: props.photographer?.email || '',
  firstName: props.photographer?.firstName || '',
  lastName: props.photographer?.lastName || '',
  companyName: props.photographer?.companyName || null,
}

async function submit(form: VeeValidateValues) {
  IncLoading()
  const formValues = form as IForm

  if (props.photographer) {
    const payload = {
      ...props.photographer,
      ...formValues,
    }
    delete payload.profilePicture
    delete payload.events
    delete payload.employee
    delete payload.files
    await patchOne(props.photographer.id, payload)
  } else {
    setPhotographerForm(formValues)
    router.push({
      name: 'admin.events.create',
      query: { step: 'end' },
    })
    emit('submitted', formValues as UserType)
  }

  DecLoading()
  resetUiModalState()
}
</script>
