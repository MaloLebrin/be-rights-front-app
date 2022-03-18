<template>
  <div class="grid grid-cols-1 gap-4 px-8 py-8 md:grid-cols-2">
    <div class="flex flex-col items-center h-full">
      <div class="mt-10 mb-6">
        <h1 class="text-black dark:text-white">Bienvenue sur</h1>
        <SimpleLogo />
      </div>

      <div class="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
        <div class="flex items-center">
          <input
            :id="RoleEnum.PHOTOGRAPHER"
            v-model="roles"
            :value="RoleEnum.PHOTOGRAPHER"
            :name="RoleEnum.PHOTOGRAPHER"
            type="radio"
            class="w-4 h-4 mr-2 border-gray-300 rounded-full text-green focus:ring-green"
          />
          <label
            :for="RoleEnum.PHOTOGRAPHER"
            class="block ml-2 text-sm text-gray-900 dark:text-white"
          >je suis un photographe ou agence de photographie</label>
        </div>
        <div class="flex items-center">
          <input
            :id="RoleEnum.COMPANY"
            v-model="roles"
            :value="RoleEnum.COMPANY"
            :name="RoleEnum.COMPANY"
            type="radio"
            class="w-4 h-4 mr-2 border-gray-300 rounded-full text-green focus:ring-green"
          />
          <label
            :for="RoleEnum.COMPANY"
            class="block ml-2 text-sm text-gray-900 dark:text-white"
          >je suis une enteprise ou un particulier</label>
        </div>

        <BField
          class="col-span-2"
          label="Nom de l'entreprise"
          :message="companyNameError"
          :status="companyNameMeta.dirty && companyNameMeta.valid ? 'success' : 'error'"
        >
          <BInput type="text" class="text-black" v-model="companyName" />
        </BField>

        <BField
          label="Prénom"
          :message="firstNameError"
          :status="firstNameMeta.dirty && firstNameMeta.valid ? 'success' : 'error'"
        >
          <BInput type="text" class="text-black" v-model="firstName" />
        </BField>
        <BField
          label="Nom"
          :message="lastNameError"
          :status="lastNameMeta.dirty && lastNameMeta.valid ? 'success' : 'error'"
        >
          <BInput type="text" class="text-black" v-model="lastName" />
        </BField>
        <BField
          class="col-span-2"
          label="Address e-mail"
          :message="emailError"
          :status="emailMeta.dirty && emailMeta.valid ? 'success' : 'error'"
        >
          <BInput type="email" class="text-black" v-model="email" />
        </BField>
        <BField
          class="col-span-2"
          label="Mot de passe"
          :message="passwordError"
          :status="passwordMeta.dirty && passwordMeta.valid ? 'success' : 'error'"
        >
          <BInput type="password" class="text-black" v-model="password" />
        </BField>

        <div class="flex flex-col items-center justify-center col-span-2">
          <BButton
            :variant="isDarkTheme ? 'white' : 'primary'"
            :disabled="!meta.valid || !meta.dirty"
            :class="['mb-8', { 'cursor-not-allowed opacity-70': !meta.valid || !meta.dirty }]"
            :isLoading="uiStore.getUIIsLoading"
            @click="submitregister"
          >S'inscrire</BButton>
          <BLink class="dark:text-white" tag="router-link" to="/login">J'ai déjà un compte</BLink>
        </div>
      </div>
    </div>
    <img
      class="hidden object-cover w-2/3 max-w-5xl shadow-2xl TranslateUpAnimation cursor-none md:block"
      src="@/assets/camera.jpg"
      alt="camera picture"
    />
  </div>
</template>

<script setup lang="ts">
import { useUiStore } from '@/store'
import useMainStore from '@/store/main/mainStore'
import { RoleEnum } from '@/types'
import { useField, useForm } from 'vee-validate'
import { string, object } from 'yup'
const { register } = userHook()
const mainStore = useMainStore()
const { isDarkTheme } = mainStore
const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore

const schema = object({
  companyName: string().required().label('Nom de l\'entreprise'),
  email: string().email().required().label('Adresse email'),
  password: string().required().label('Mot de passe'),
  firstName: string().required().label('Prénom'),
  lastName: string().required().label('Nom'),
  roles: string().required()
})

const { meta } = useForm({ validationSchema: schema })
const { errorMessage: emailError, value: email, meta: emailMeta, setErrors } = useField<string>('email')
const { errorMessage: passwordError, value: password, meta: passwordMeta } = useField<string>('password')
const { errorMessage: companyNameError, value: companyName, meta: companyNameMeta } = useField<string>('companyName')
const { errorMessage: firstNameError, value: firstName, meta: firstNameMeta } = useField<string>('firstName')
const { errorMessage: lastNameError, value: lastName, meta: lastNameMeta } = useField<string>('lastName')
const { value: roles } = useField<RoleEnum>('roles', undefined, { initialValue: RoleEnum.COMPANY })


async function submitregister() {
  IncLoading()
  await register({
    email: email.value,
    password: password.value,
    companyName: companyName.value,
    firstName: firstName.value,
    lastName: lastName.value,
    roles: roles.value,
  })
  DecLoading()
}


</script>