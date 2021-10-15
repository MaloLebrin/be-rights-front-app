<template>
  <BCardModal :isActive="isOpen">
    <template #title>
      <h3 class="text-3xl font-semibold text-center">
        Connectez vous
      </h3>
    </template>

    <div class="flex flex-col items-center">
      <BField
        label="Addresse e-mail"
        :status="isEmailValid"
      >
        <BInput
          v-bind="$props"
          type="email"
          v-model="email"
          placeholder="Ecrivez ici"
        />
      </BField>
      <BField
        class="flex flex-col items-center justify-items-center"
        label="Mot de passe"
        :status="isPasswordValid"
      >
        <BInput
          type="password"
          v-model="password"
          placeholder="Ecrivez ici"
        />
      </BField>

      <BLinkc class="mb-2">S'inscrire</BLinkc>
      <BButton
        class="text-white mb-2"
        variant="danger"
        @click="onClickLogin"
        :aria-disabled="isSubmitButtonDisabled"
        :disabled="isSubmitButtonDisabled"
      >
        Se connecter
      </BButton>
      <BLink class="text-red">Mot de passe oublié</BLink>

    </div>
  </BCardModal>
</template>
<script lang='ts'>
import { defineComponent, reactive, computed, toRefs } from 'vue'

export default defineComponent({
  name: 'LoginModale',
  props: {
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const form = reactive({
      email: null,
      password: null,
    })

    const isPasswordValid = computed(() => !form.password?.length ? 'success' : 'error')
    const isEmailValid = computed(() => !form.email?.length ? 'success' : 'error')

    const isSubmitButtonDisabled = computed(() => !isEmailValid.value && !isPasswordValid.value)

    async function onClickLogin() {
      const payload = {
        email: form.email,
        password: form.password,
      }
    }

    return {
      ...toRefs(form),
      isPasswordValid,
      isEmailValid,
      onClickLogin,
      isSubmitButtonDisabled,
    }
  },
})
</script>