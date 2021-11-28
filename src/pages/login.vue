<template>
  <div class="flex flex-col items-center justify-center h-full w-full
  bg-white">
    <BCard
      variant="white"
      class="p-16 dark:bg-blue-dark_bold DarkModeAnimation"
    >
      <div class="mb-6">
        <h1 class="text-black dark:text-white">Bienvenue sur</h1>
        <SimpleLogo />
      </div>

      <BField label="Address e-mail">
        <BInput
          type="email"
          class="text-black"
          v-model="form.email"
        />
      </BField>
      <BField label="Mot de passe">
        <BInput
          type="password"
          class="text-black"
          v-model="form.password"
        />
      </BField>
      <div class="grid grid-cols-1 gap-4">
        <BLink>S'inscrire</BLink>
        <BButton
          :disabled="isSubmitDisabled"
          variant="danger"
          @click="submitLogin"
        >Se Connecter</BButton>
        <BLink>Mot de passe oublié</BLink>
      </div>
    </BCard>
  </div>
</template>

<script setup lang="ts">
import { userHook } from '@/hooks'
import { computed, reactive } from 'vue'

    const { login } = userHook()
    const form = reactive({
      email: '',
      password: '',
    })

    async function submitLogin() {
      await login({ email: form.email, password: form.password })
    }

    const isSubmitDisabled = computed(() => form.email.length === 0 || form.password.length === 0)

</script>
