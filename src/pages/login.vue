<template>
<transition name="fade">
  <div
    class="container grid min-h-screen grid-cols-1 gap-12 px-8 py-8 mx-auto mt-32 md:grid-cols-2"
  >
    <div class="flex flex-col space-x-12 space-y-12 max-w-1/2">
      <div class="mb-26">
        <h1 class="text-black dark:text-white">
          Connectez vous sur
        </h1>
        <SimpleLogo />
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

      <div class="flex flex-col items-center justify-center space-y-6">
        <BaseButton
          :disabled="!meta.valid || !meta.dirty"
          :is-loading="uiStore.getUIIsLoading"
          @click="submitLogin"
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
  </div>
</transition>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { object, string } from 'yup'

const { login } = userHook()
const { IncLoading, DecLoading } = useUiStore()
const uiStore = useUiStore()

const schema = object({
  email: string().email('vous devez entrer in email valide').required('L\'adresse email est requise'),
  password: string().required('Le mot de passe est requis'),
})

const { meta } = useForm({ validationSchema: schema })
const { errorMessage: emailError, value: email } = useField<string>('email')
const { errorMessage: passwordError, value: password } = useField<string>('password')

async function submitLogin() {
  IncLoading()
  await login({ email: email.value, password: password.value })
  DecLoading()
}
</script>
