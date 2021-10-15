<template>
  <h1>Bienvenue sur Be right</h1>

  <BCardModal is-active>
    <BField label="Address e-mail">
      <BInput />
    </BField>
    <BField label="Mot de passe">
      <BInput />
    </BField>
  </BCardModal>

</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'Login',
  setup() {
    const form = reactive({
      email: '',
      password: '',
    })

  },
})
</script>
