<template>
  <transition name="fade">
    <div
      class="container grid min-h-screen grid-cols-1 gap-12 px-8 py-8 mx-auto mt-32 md:grid-cols-2"
    >
      <div class="flex flex-col space-x-12 space-y-12 max-w-1/2">
        <div class="mb-26">
          <h1 class="text-black dark:text-white">Connectez vous sur</h1>
          <SimpleLogo />
        </div>

        <BField
          label="Address e-mail"
          :message="emailError"
          :status="emailMeta.dirty && emailMeta.valid ? 'success' : 'error'"
        >
          <BInput type="email" class="text-black dark:text-gray-900" v-model="email" />
        </BField>
        <BField
          label="Mot de passe"
          :message="passwordError"
          :status="passwordMeta.dirty && passwordMeta.valid ? 'success' : 'error'"
        >
          <BInput type="password" class="text-black" v-model="password" />
        </BField>
        <div class="flex flex-col items-center justify-center space-y-6">
          <BButton
            :disabled="!meta.valid || !meta.dirty"
            :class="{ 'cursor-not-allowed opacity-70': !meta.valid || !meta.dirty }"
            :variant="isDarkTheme ? 'white' : 'primary'"
            :isLoading="uiStore.getUIIsLoading"
            @click="submitLogin"
          >Se Connecter</BButton>
          <BLink class="dark:text-white" tag="router-link" to="/register">S'inscrire</BLink>
          <BLink class="dark:text-white">Mot de passe oublié</BLink>
        </div>
      </div>

      <img
        class="hidden object-cover w-2/3 max-w-5xl shadow-2xl TranslateUpAnimation cursor-none md:block"
        src="@/assets/camera.jpg"
        alt="camera picture"
      />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { object, string } from 'yup'

const { login } = userHook()
const mainStore = useMainStore()
const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
const { isDarkTheme } = mainStore

const schema = object({
  email: string().email().required().label('Adresse email'),
  password: string().required().label('Mot de passe'),
})


const { meta } = useForm({ validationSchema: schema })
const { errorMessage: emailError, value: email, meta: emailMeta } = useField<string>('email')
const { errorMessage: passwordError, value: password, meta: passwordMeta } = useField<string>('password')

async function submitLogin() {
  IncLoading()
  await login({ email: email.value, password: password.value })
  DecLoading()
}

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>