<template>
  <h1>Bienvenue sur Be right</h1>

  <BField label="Address e-mail">
    <BInput v-model="email" />
  </BField>
  <BField label="Mot de passe">
    <BInput v-model="password" />
  </BField>
  <div class="flex flex-col ">
    <BLink>S'inscrire</BLink>
    <BButton @click="submitLogin">Se Connecter</BButton>
    <BLink>Mot de passe oublié</BLink>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'Login',
  setup() {
    const form = reactive({
      email: '',
      password: '',
    })

    async function submitLogin() {

    }

    return {
      ...toRefs(form),
      submitLogin,
    }
  },
})
</script>
