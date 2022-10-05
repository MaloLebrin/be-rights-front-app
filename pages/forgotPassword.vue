<template>
<transition name="fade">
  <Form
    v-slot="{ meta, isSubmitting }"
    :validation-schema="schema"
    :initial-values="initialValues"
    class="container flex justify-center min-h-screen px-8 py-8 mx-auto mt-32"
    @submit="onSubmit"
  >
    <div class="flex flex-col space-y-12 text-center">
      <div class="mb-26">
        <LogoSimpleLogo />
        <h1 class="text-black dark:text-white">
          Récupération de mot de passe
        </h1>
      </div>

      <BaseInput
        label="Adresse email"
        name="email"
        type="email"
        autocomplete="email"
        is-required
      />

      <FormsFormApiMessage
        :message="state.successMessage"
        :errors="state.submissionErrors"
        :is-success="state.isSuccess"
      />

      <div class="flex flex-col items-center justify-center space-y-6">
        <BaseButton
          :disabled="!meta.valid || !meta.dirty || isSubmitting"
          :is-loading="uiStore.getUIIsLoading || isSubmitting"
          type="submit"
        >
          Réinitialiser le mot de passe
        </BaseButton>
        <nuxt-link
          class="LinkClass"
          :to="{ name: 'register' }"
        >
          Je n'ai pas de compte
        </nuxt-link>
        <nuxt-link
          class="LinkClass"
          :to="{ name: 'login' }"
        >
          J'ai déjà un compte
        </nuxt-link>
      </div>
    </div>
  </Form>
</transition>
</template>

<script setup lang="ts">
import { object, string } from 'yup'
import { Form } from 'vee-validate'
import axiosInstance from '@/axios.config'
import type { VeeValidateValues } from '@/types'
import { useUiStore } from '~~/store'

const { IncLoading, DecLoading } = useUiStore()
const uiStore = useUiStore()
const { $toast } = useNuxtApp()

const schema = object({
  email: string().email('vous devez entrer in email valide').required('L\'adresse email est requise'),
})

const initialValues = { email: '' }

interface State {
  submissionErrors: string[]
  successMessage: string | null
  isSuccess: boolean
}
const state = reactive<State>({
  submissionErrors: [],
  successMessage: null,
  isSuccess: false,
})

function resetState() {
  state.submissionErrors = []
  state.successMessage = null
  state.isSuccess = false
}

async function onSubmit(form: VeeValidateValues) {
  IncLoading()
  resetState()
  try {
    const res = await axiosInstance.post('auth/forgot-password', form)
    const response = res.data as any
    if (response.isSuccess) {
      state.isSuccess = true
    }
    state.successMessage = response.message
  } catch (error: any) {
    state.submissionErrors.push(error.response.data.error)
    $toast.error('Une erreur est survenue')
  } finally {
    DecLoading()
  }
}
</script>
