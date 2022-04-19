<template>
<transition name="fade">
  <div
    class="flex items-center justify-center lg:container"
  >
    <div class="flex flex-col space-x-12 space-y-12 md:max-w-lg">
      <div class="space-y-4 mb-26">
        <SimpleLogo />
        <h1 class="text-black dark:text-white">
          Connectez vous sur
        </h1>
      </div>

      <div class="space-y-4">
        <label
          class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
        >Mot de passe&nbsp;:</label>
        <BaseInput
          v-model="password"
          type="password"
          :error="passwordError"
        />
      </div>
      <div class="space-y-4">
        <label
          class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
        >Confirmation de Mot de passe&nbsp;:</label>
        <BaseInput
          v-model="passwordConfirmation"
          type="password"
          autocomplete="password_confirmation"
          :error="passwordConfirmationError"
        />
      </div>

      <FormApiMessage
        :message="state.successMessage"
        :errors="state.submissionErrors"
        :is-success="state.isSuccess"
      />

      <div class="flex flex-col items-center justify-center space-y-6">
        <BaseButton
          :disabled="!meta.valid || !meta.dirty"
          :is-loading="uiStore.getUIIsLoading"
          @click="onSubmit"
        >
          Réinitialiser le mot de passe
        </BaseButton>
      </div>
    </div>
  </div>
</transition>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { object, ref as reference, string } from 'yup'
import axiosInstance from '@/axios.config'

const { IncLoading, DecLoading, setUIErrorToast } = useUiStore()
const uiStore = useUiStore()
const { params, query } = useRoute()

const schema = object({
  password: string().required('Le mot de passe est requis'),
  passwordConfirmation: string().oneOf([reference('password'), null], 'Les mots de passe sont différents').required('Confirmez votre nouveau mot de passe'),
})

const { meta } = useForm({ validationSchema: schema })
const { errorMessage: passwordError, value: password } = useField<string>('password')
const { errorMessage: passwordConfirmationError, value: passwordConfirmation } = useField<string>('passwordConfirmation')

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

async function onSubmit() {
  IncLoading()
  resetState()
  try {
    const res = await axiosInstance.post('auth/reset-password', {
      email: query.email,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
      twoFactorRecoveryCode: params.token,
    })
    const response = res.data as any
    if (response.isSuccess) {
      state.isSuccess = true
    }
    state.successMessage = response.message
  } catch (error: any) {
    state.submissionErrors.push(error.response.data.error)
    setUIErrorToast()
  } finally {
    DecLoading()
  }
}
</script>