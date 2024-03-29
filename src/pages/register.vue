<template>
<div class="container grid grid-cols-1 gap-4 px-8 py-8 md:container-lg md:grid-cols-2 lg:grid-cols-3">
  <Form
    v-slot="{ meta, isSubmitting }"
    :validation-schema="schema"
    :initial-values="initialValues"
    class="flex flex-col items-center h-full lg:col-span-2"
    @submit="submitregister"
  >
    <div class="mt-10 mb-6">
      <h1 class="text-black dark:text-white">
        Bienvenue sur
      </h1>
      <SimpleLogo />
    </div>

    <div class="container grid grid-cols-1 gap-6 text-left md:grid-cols-2">
      <BaseRadio
        :id="RoleEnum.PHOTOGRAPHER"
        :value="RoleEnum.PHOTOGRAPHER"
        name="roles"
      >
        je suis un photographe ou agence de photographie
      </BaseRadio>
      <BaseRadio
        :id="RoleEnum.COMPANY"
        :value="RoleEnum.COMPANY"
        name="roles"
      >
        je suis une enteprise ou un particulier
      </BaseRadio>

      <div class="col-span-2">
        <BaseInput
          label="Nom de l'entreprise"
          name="companyName"
          type="text"
          autocomplete="companyName"
          is-required
        />
      </div>

      <BaseInput
        class="col-span-2"
        label="Prénom"
        name="firstName"
        type="text"
        autocomplete="firstName"
        is-required
      />

      <BaseInput
        class="col-span-2"
        label="Nom"
        name="lastName"
        type="text"
        autocomplete="lastName"
        is-required
      />

      <div class="col-span-2 space-y-4">
        <BaseInput
          class="col-span-2"
          label="Adresse email"
          name="email"
          type="email"
          autocomplete="email"
          is-required
        />
        <BaseInput
          label="Mot de passe"
          name="password"
          type="password"
          autocomplete="current-password"
          is-required
        />
      </div>

      <div class="flex flex-col items-center justify-center space-y-4 md:col-span-2">
        <BaseButton
          :disabled="!meta.valid || !meta.dirty || isSubmitting"
          :is-loading="uiStore.getUIIsLoading || isSubmitting"
          type="submit"
        >
          S'inscrire
        </BaseButton>
        <router-link
          class="LinkClass"
          :to="{ name: 'login' }"
        >
          J'ai déjà un compte
        </router-link>
      </div>
    </div>
  </Form>

  <div class="items-center hidden md:flex">
    <img
      class="hidden object-cover w-2/3 max-w-5xl shadow-2xl TranslateUpAnimation cursor-none md:block"
      src="@/assets/camera.jpg"
      alt="camera picture"
    >
  </div>
</div>
</template>

<script setup lang="ts">
import { object, string } from 'yup'
import type { RegisterPayload, VeeValidateValues } from '@/types'
import { RoleEnum } from '@/types'
const { register } = userHook()
const { checkMailIsAlreadyExist } = authHook()
const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore

const schema = object({
  companyName: string().required('Nom de l\'entreprise est requis').label('Nom de l\'entreprise'),
  email: string().email('vous devez entrer in email valide').required().label('Adresse email'),
  password: string().required('Le mot de passe est requis').label('Mot de passe'),
  firstName: string().required('Le prénom est requis').label('Prénom'),
  lastName: string().required('le nom est requis').label('Nom'),
  roles: string().oneOf([RoleEnum.PHOTOGRAPHER, RoleEnum.COMPANY]),
})

const initialValues = {
  email: '',
  companyName: '',
  password: '',
  firstName: '',
  lastName: '',
  roles: RoleEnum.COMPANY,
}

async function submitregister(form: VeeValidateValues) {
  IncLoading()
  const isEmailExist = await checkMailIsAlreadyExist(form.email)
  if (!isEmailExist.success) {
    const toast = useToast()
    toast.error(isEmailExist.message)
  } else {
    await register(form as RegisterPayload)
  }
  DecLoading()
}
</script>
