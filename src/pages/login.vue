<template>
  <div class="flex flex-col items-center justify-center h-full w-full">
    <BCard
      variant="white"
      class="p-16"
    >
      <div>
        <h1 class="text-black">Bienvenue sur</h1>
        <SimpleLogo />
      </div>

      <BField label="Address e-mail">
        <BInput
          type="email"
          class="text-black"
          v-model="email"
        />
      </BField>
      <BField label="Mot de passe">
        <BInput
          type="password"
          class="text-black"
          v-model="password"
        />
      </BField>
      <div class="flex flex-col ">
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

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import userHook from '~/hooks/userHook'
import router from '~/router'

export default defineComponent({
  name: 'Login',
  setup() {
    const { login } = userHook()
    const form = reactive({
      email: '',
      password: '',
    })

    async function submitLogin() {
      await login({ email: form.email, password: form.password })
    }

    const isSubmitDisabled = computed(() => form.email.length === 0 || form.password.length === 0)

    return {
      ...toRefs(form),
      submitLogin,
      isSubmitDisabled,
    }
  },
})
</script>
