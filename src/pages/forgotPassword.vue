<template>
<transition name="fade">
  <div
    class="container flex justify-center min-h-screen px-8 py-8 mx-auto mt-32"
  >
    <div class="flex flex-col max-w-lg space-x-12 space-y-12">
      <div class="mb-26">
        <SimpleLogo />
        <h1 class="text-black dark:text-white">
          Récupération de mot de passe
        </h1>
      </div>

      <div class="space-y-4">
        <label
          class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
        >Adress email&nbsp;:</label>
        <BaseInput
          v-model="email"
          type="email"
          :error="emailError"
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
        <router-link
          class="LinkClass"
          :to="{ name: 'register' }"
        >
          Je n'ai pas de compte
        </router-link>
        <router-link
          class="LinkClass"
          :to="{ name: 'login' }"
        >
          J'ai déjà un compte
        </router-link>
      </div>
    </div>
  </div>
</transition>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { object, string } from 'yup'
import axiosInstance from '@/axios.config'

const { IncLoading, DecLoading, setUIErrorToast } = useUiStore()
const uiStore = useUiStore()

const schema = object({
  email: string().email('vous devez entrer in email valide').required('L\'adresse email est requise'),
})

const { meta } = useForm({ validationSchema: schema })
const { errorMessage: emailError, value: email } = useField<string>('email')

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
    const res = await axiosInstance.post('auth/forgot-password', { email: email.value })
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
