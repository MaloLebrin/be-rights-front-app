<template>
  <transition name="fade">
    <div class="container grid grid-cols-1 md:grid-cols-2 gap-12 h-full w-full bg-white mt-52">
      <div class="flex flex-col space-y-12">
        <div class="mb-26">
          <h1 class="text-black dark:text-white">Connectez vous sur</h1>
          <SimpleLogo />
        </div>

        <BField
          label="Address e-mail"
          :message="emailError"
          :status="emailMeta.dirty && emailMeta.valid ? 'success' : 'error'"
        >
          <BInput type="email" class="text-black" v-model="email" />
        </BField>
        <BField
          label="Mot de passe"
          :message="passwordError"
          :status="passwordMeta.dirty && passwordMeta.valid ? 'success' : 'error'"
        >
          <BInput type="password" class="text-black" v-model="password" />
        </BField>
        <div class="flex flex-col justify-center items-center space-y-6">
          <BButton
            :disabled="!meta.valid || !meta.dirty"
            :class="{ 'cursor-not-allowed opacity-70': !meta.valid || !meta.dirty }"
            variant="danger"
            :isLoading="isLoading"
            @click="submitLogin"
          >Se Connecter</BButton>
          <BLink tag="router-link" to="/register">S'inscrire</BLink>
          <BLink>Mot de passe oublié</BLink>
        </div>
      </div>

      <img
        class="shadow-2xl TranslateUpAnimation cursor-none"
        src="@/assets/camera.jpg"
        alt="camera picture"
      />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { userHook } from '@/hooks'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
import * as yup from 'yup'

const { login } = userHook()

const schema = yup.object({
  email: yup.string().email().required().label('Adresse email'),
  password: yup.string().required().label('Mot de passe'),
})

const isLoading = ref(false)

const { meta } = useForm({ validationSchema: schema })
const { errorMessage: emailError, value: email, meta: emailMeta, setErrors } = useField<string>('email')
const { errorMessage: passwordError, value: password, meta: passwordMeta } = useField<string>('password')

async function submitLogin() {
  isLoading.value = true
  await login({ email: email.value, password: password.value })
  isLoading.value = false
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