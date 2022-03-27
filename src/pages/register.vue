<template>
  <div class="grid grid-cols-1 gap-4 px-8 py-8 md:grid-cols-2">
    <div class="flex flex-col items-center h-full">
      <div class="mt-10 mb-6">
        <h1 class="text-black dark:text-white">Bienvenue sur</h1>
        <SimpleLogo />
      </div>

      <div class="grid grid-cols-1 gap-6 text-left md:grid-cols-2">
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

        <div class="space-y-4 md:col-span-2">
          <label
            class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
          >Nom de l'entreprise&nbsp;*&nbsp;:</label>
          <BaseInput type="text" v-model="companyName" :error="companyNameError" />
        </div>

        <div class="space-y-4">
          <label
            class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
          >Prénom&nbsp;*&nbsp;:</label>
          <BaseInput type="text" v-model="firstName" :error="firstNameError" />
        </div>

        <div class="space-y-4">
          <label class="block mb-2 text-lg font-bold text-blue dark:text-gray-100">Nom&nbsp;*&nbsp;:</label>
          <BaseInput type="text" v-model="lastName" :error="lastNameError" />
        </div>

        <div class="space-y-4 md:col-span-2">
          <label
            class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
          >Address e-mail&nbsp;*&nbsp;:</label>
          <BaseInput type="email" v-model="email" :error="emailError" />
        </div>

        <div class="space-y-4 md:col-span-2">
          <label
            class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
          >Password&nbsp;*&nbsp;:</label>
          <BaseInput type="password" v-model="password" :error="passwordError" />
        </div>

        <div class="flex flex-col items-center justify-center space-y-4 md:col-span-2">
          <BaseButton :disabled="!meta.valid || !meta.dirty" @click="submitregister">S'inscrire</BaseButton>
          <router-link class="LinkClass" :to="{ path: '/login' }">J'ai déjà un compte</router-link>
        </div>
      </div>
    </div>

    <div class="items-center justify-center hidden md:flex">
      <img
        class="hidden object-cover w-2/3 max-w-5xl shadow-2xl TranslateUpAnimation cursor-none md:block"
        src="@/assets/camera.jpg"
        alt="camera picture"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RoleEnum } from '@/types'
import { useField, useForm } from 'vee-validate'
import { string, object } from 'yup'
const { register } = userHook()
const { IncLoading, DecLoading } = useUiStore()

const schema = object({
  companyName: string().required().label('Nom de l\'entreprise'),
  email: string().email().required().label('Adresse email'),
  password: string().required().label('Mot de passe'),
  firstName: string().required().label('Prénom'),
  lastName: string().required().label('Nom'),
  roles: string().required()
})

const { meta } = useForm({ validationSchema: schema })
const { errorMessage: emailError, value: email } = useField<string>('email')
const { errorMessage: passwordError, value: password } = useField<string>('password')
const { errorMessage: companyNameError, value: companyName } = useField<string>('companyName')
const { errorMessage: firstNameError, value: firstName } = useField<string>('firstName')
const { errorMessage: lastNameError, value: lastName } = useField<string>('lastName')
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
