<template>
<transition name="fade">
  <Form
    v-slot="{ meta, isSubmitting }"
    :validation-schema="schema"
    :initial-values="initialValues"
    class="container grid min-h-screen grid-cols-1 gap-12 mx-auto mt-32 md:grid-cols-2"
    @submit="submitLogin"
  >
    <div class="flex flex-col space-x-12 space-y-12 max-w-1/2">
      <div class="space-y-2 mb-26">
        <h1 class="text-center text-black dark:text-white">
          Connectez vous sur
        </h1>
        <SimpleLogo />
      </div>

      <div class="space-y-4">
        <BaseInput
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
      <div class="flex flex-col items-center justify-center space-y-6">
        <BaseButton
          :disabled="!meta.valid || !meta.dirty || isSubmitting"
          :is-loading="uiStore.getUIIsLoading || isSubmitting"
          type="submit"
        >
          Se Connecter
        </BaseButton>
        <router-link
          class="LinkClass"
          :to="{ name: 'register' }"
        >
          S'inscrire
        </router-link>
        <router-link
          class="LinkClass"
          :to="{ name: 'forgot-password' }"
        >
          Mot de passe oublié
        </router-link>
      </div>
    </div>

    <img
      class="hidden object-cover w-2/3 max-w-5xl shadow-2xl TranslateUpAnimation cursor-none md:block"
      src="@/assets/camera.jpg"
      alt="camera picture"
    >
  </Form>
</transition>
</template>

<script setup lang="ts">
import { object, string } from 'yup'
import type { VeeValidateValues } from '@/types'

const { login, redirectBaseOneCurrentUserRole } = userHook()
const { IncLoading, DecLoading } = useUiStore()
const uiStore = useUiStore()
const userStore = useUserStore()

interface IForm extends VeeValidateValues {
  email: string
  password: string
}

const schema = object({
  email: string().email('vous devez entrer in email valide').required('L\'adresse email est requise'),
  password: string().required('Le mot de passe est requis'),
})

const initialValues = {
  email: '',
  password: '',
}

async function submitLogin(form: VeeValidateValues) {
  IncLoading()
  await login(form as IForm)
  if (userStore.getCurrent) {
    redirectBaseOneCurrentUserRole(userStore.getCurrent)
  }
  DecLoading()
}
</script>
