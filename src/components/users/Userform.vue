<template>
<form
  v-if="user"
  class="space-y-10"
>
  <!-- Profile section -->
  <div class="px-4 py-6 shadow sm:p-6 lg:pb-8 sm:rounded-lg">
    <h2 class="text-xl font-semibold leading-6 text-gray-900">
      Votre Profile
    </h2>

    <div class="flex flex-col mt-6 lg:flex-row">
      <div class="grid flex-grow grid-cols-1 gap-4 md:grid-cols-2">
        <div class="space-y-2">
          <label
            for="firstName"
            class="block text-sm font-medium text-gray-700 dark:text-white-break"
          >Prénom</label>
          <BaseInput
            v-model="firstName"
            :error="firstNameError"
          />
        </div>
        <div class="space-y-2">
          <label
            for="lastName"
            class="block text-sm font-medium text-gray-700 dark:text-white-break"
          >Nom</label>
          <BaseInput
            v-model="lastName"
            :error="lastNameError"
          />
        </div>
      </div>

      <div class="flex-grow mt-6 lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
        <p
          class="text-sm font-medium text-gray-700"
          aria-hidden="true"
        >
          Photo
        </p>
        <div class="mt-1 lg:hidden">
          <div class="flex items-center">
            <div
              class="flex-shrink-0 inline-block w-12 h-12 overflow-hidden rounded-full"
              aria-hidden="true"
            >
              <UserAvatarForm :user="user" />
            </div>
          </div>
        </div>

        <div class="relative hidden overflow-hidden rounded-full lg:block">
          <UserAvatarForm :user="user" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-6 mt-6">
      <div class="col-span-12 space-y-2 sm:col-span-6">
        <label
          for="email"
          class="block text-sm font-medium text-gray-700 dark:text-white-break"
        >Votre addresse email</label>
        <BaseInput
          v-model="email"
          type="email"
          :error="emailError"
        />
      </div>
      <div class="col-span-12 space-y-2 sm:col-span-6">
        <label
          for="first-name"
          class="block text-sm font-medium text-gray-700 dark:text-white-break"
        >Nom de l'entreprise</label>
        <BaseInput
          v-model="companyName"
          :error="companyNameError"
        />
      </div>

      <div class="col-span-12 space-y-2 sm:col-span-6">
        <label
          class="block text-sm font-medium text-gray-700 dark:text-white-break"
        >N° Siret&nbsp;*&nbsp;:</label>
        <BaseInput
          v-model="siret"
          :error="siretError"
        />
      </div>

      <div class="hidden md:block" />

      <div
        v-if="userStore.isCurrentUserAdmin"
        class="col-span-12 space-y-2 sm:col-span-6"
      >
        <label
          class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
        >Role utilisateur&nbsp;*&nbsp;:</label>
        <Select
          :options="userRolesArray"
          :default="roles ? roles : 'Sélectionnez un Role'"
          @selected="handleRoleUser"
        />
        <div
          v-if="rolesError?.length"
          class="text-sm text-red-500"
        >
          {{ rolesError }}
        </div>
      </div>
      <div
        v-if="userStore.isCurrentUserAdmin"
        class="col-span-12 space-y-2 sm:col-span-6"
      >
        <label
          class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
        >Abonnement&nbsp;*&nbsp;:</label>
        <Select
          :options="subscriptionArray"
          :default="subscription ? subscription : 'Sélectionnez un Abonnement'"
          @selected="handleSubscription"
        />
        <div
          v-if="subscriptionError?.length"
          class="text-sm text-red-500"
        >
          {{ subscriptionError }}
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center w-full mt-12">
      <BaseButton
        :disabled="!meta.valid || !meta.dirty"
        @click.prevent="submit"
      >
        <template #icon>
          <SaveIconOutline />
        </template>
        Enregistrer
      </BaseButton>
    </div>
  </div>

  <div class="relative px-4 py-5 space-y-12 shadow rounded-2xl sm:rounded-lg">
    <div class="flex items-center">
      <h5 class="px-6 py-4 text-xl font-medium">
        Votre logo
      </h5>
      <ArrowCircleDownIconOutline class="w-6 h-6 text-gray-600" />
    </div>

    <div class="px-6 py-4 space-y-12">
      <div>
        <InputFile
          message="Sélectionnez votre logo"
          :url="userLogoUrl"
          @uploadFile="uploadFile"
        />
      </div>
      <div class="flex items-center justify-center">
        <BaseButton
          :disabled="!file"
          @click="submitFile"
        >
          <template #icon>
            <SaveIconOutline />
          </template>
          Enregistrer le Logo
        </BaseButton>
      </div>
    </div>
  </div>
</form>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { object, string } from 'yup'
import { RoleEnum, userRolesArray } from '@/types'
import type { SubscriptionEnum, UserType } from '@/types/typesExported'
import { FileTypeEnum, subscriptionArray } from '@/types/typesExported'

interface Props {
  id: number | null
}

const props = withDefaults(defineProps<Props>(), {
  id: null,
})

const userStore = useUserStore()
const { IncLoading, DecLoading } = useUiStore()
const fileStore = useFileStore()
const { patchOne } = userHook()
const { postOne } = fileHook()

const user = computed(() => {
  if (props.id)
    return userStore.getOne(props.id)

  return null
})

const userLogoUrl = computed(() => fileStore.getWhereArray(file => file.createdByUser === props.id && file.type === FileTypeEnum.LOGO)[0]?.secure_url)

const file = ref<null | FormData>(null)

const schema = object({
  companyName: string().nullable().label('Nom de l\'entreprise'),
  email: string().email().required('L\'adresse email est requise'),
  firstName: string().required('Le prenom est requis'),
  lastName: string().required('Le nom est requis'),
  siret: string().nullable().label('N° Siret'),
  roles: string().required('le role est requis'),
  subscription: string().required('L\'abonnement est requis'),
})

const { meta } = useForm({ validationSchema: schema })
const { errorMessage: emailError, value: email } = useField<string>('email', undefined, {
  initialValue: user.value ? user.value.email : '',
})
const { errorMessage: siretError, value: siret } = useField<string>('siret', undefined, {
  initialValue: user.value ? user.value.siret : '',
})
const { errorMessage: companyNameError, value: companyName } = useField<string>('companyName', undefined, {
  initialValue: user.value ? user.value.companyName : '',
})
const { errorMessage: firstNameError, value: firstName } = useField<string>('firstName', undefined, {
  initialValue: user.value ? user.value.firstName : '',
})
const { errorMessage: lastNameError, value: lastName } = useField<string>('lastName', undefined, {
  initialValue: user.value ? user.value.lastName : '',
})
const { value: roles, errorMessage: rolesError, handleChange: handleRoleUser } = useField<RoleEnum>('roles', undefined, {
  initialValue: user.value ? user.value.roles : RoleEnum.USER,
})
const { value: subscription, errorMessage: subscriptionError, handleChange: handleSubscription } = useField<SubscriptionEnum | null>('subscription', undefined, {
  initialValue: user.value ? user.value.subscription : null,
})

function uploadFile(fileUploaded: File) {
  // TODO how to post/patch a file base64
  const formData = new FormData()
  formData.append('file', fileUploaded)
  formData.append('type', FileTypeEnum.LOGO)
  formData.append('userId', userStore.getCurrentUserId!.toString())
  formData.append('name', 'Logo')
  formData.append('description', 'Logo de l\'utilisateur')
  file.value = formData
}

async function submit() {
  IncLoading()
  if (props.id) {
    const payload = {
      ...user.value,
      companyName: companyName.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      siret: siret.value,
      roles: roles.value,
      subscription: subscription.value!,
    }
    delete payload.profilePicture
    delete payload.events
    delete payload.employee
    delete payload.files
    await patchOne(props.id, payload as UserType)
  }
  DecLoading()
}

async function submitFile() {
  if (file.value) {
    IncLoading()
    await postOne(file.value, userStore.getCurrentUserId)
    DecLoading()
  }
}
</script>
