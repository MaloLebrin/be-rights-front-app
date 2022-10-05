<template>
<transition name="fade">
  <Form
    v-slot="{ meta, isSubmitting }"
    :validation-schema="schema"
    :initial-values="initialValues"
    class="flex items-center justify-center lg:container"
    @submit="onSubmit"
  >
    <div class="flex flex-col space-x-12 space-y-12 md:max-w-lg">
      <div class="space-y-4 mb-26">
        <LogoSimpleLogo />
        <h1 class="text-black dark:text-white">
          Connectez vous sur
        </h1>
      </div>

      <div class="space-y-4">
        <BaseInput
          label="Mot de passe"
          name="password"
          type="password"
          autocomplete="current-password"
          is-required
        />

        <BaseInput
          label="Confirmation de Mot de passe"
          name="passwordConfirmation"
          type="password"
          autocomplete="password_confirmation"
          is-required
        />
      </div>

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
      </div>
    </div>
  </Form>
</transition>
</template>

<script setup lang="ts">
import { object, ref as reference, string } from 'yup'
import { Form } from 'vee-validate'
import type { VeeValidateValues } from '@/types'
import axiosInstance from '@/axios.config'
import { useUiStore } from '~~/store'

const { IncLoading, DecLoading } = useUiStore()
const uiStore = useUiStore()
const { params, query } = useRoute()
const { $toast } = useNuxtApp()

const schema = object({
  password: string().required('Le mot de passe est requis'),
  passwordConfirmation: string().oneOf([reference('password'), null], 'Les mots de passe sont différents').required('Confirmez votre nouveau mot de passe'),
})

const initialValues = {
  password: '',
  passwordConfirmation: '',
}

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
    const res = await axiosInstance.post('auth/reset-password', {
      email: query.email,
      password: form.password,
      password_confirmation: form.passwordConfirmation,
      twoFactorRecoveryCode: params.token,
    })
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
