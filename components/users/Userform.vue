<template>
<div class="space-y-10">
  <!-- Profile section -->
  <Form
    v-if="user"
    v-slot="{ meta, isSubmitting, values }"
    :validation-schema="schema"
    :initial-values="initialValues"
    class="px-4 py-6 shadow sm:p-6 lg:pb-8 sm:rounded-lg"
    @submit="submit"
  >
    <h2 class="text-xl font-semibold leading-6 text-gray-900">
      Votre Profile
    </h2>

    <div class="flex flex-col mt-6 lg:flex-row">
      <div class="grid flex-grow grid-cols-1 gap-4 md:grid-cols-2">
        <div class="space-y-2">
          <BaseInput
            class="col-span-2"
            label="Prénom"
            name="firstName"
            type="text"
            autocomplete="firstName"
            is-required
          />
        </div>
        <div class="space-y-2">
          <BaseInput
            label="Nom"
            name="lastName"
            type="text"
            autocomplete="lastName"
            is-required
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
              <UsersUserAvatarForm :user="user" />
            </div>
          </div>
        </div>

        <div class="relative hidden overflow-hidden rounded-full lg:block">
          <UsersUserAvatarForm :user="user" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-6 mt-6">
      <div class="col-span-12 sm:col-span-6">
        <BaseInput
          label="Adresse email"
          name="email"
          type="email"
          autocomplete="email"
          is-required
        />
      </div>
      <div class="col-span-12 sm:col-span-6">
        <BaseInput
          label="Nom de l'entreprise"
          name="companyName"
          type="text"
          autocomplete="companyName"
          is-required
        />
      </div>

      <div class="col-span-12 sm:col-span-6">
        <BaseInput
          label="N° Siret"
          name="siret"
          autocomplete="siret"
        />
      </div>

      <div class="hidden md:block" />

      <div
        v-if="userStore.isCurrentUserAdmin"
        class="col-span-12 sm:col-span-6"
      >
        <BaseSelect
          label="Role utilisateur"
          name="roles"
          placeholder="Choisissez un rôle"
          :display-value="getRoleTranslation(values.roles)"
          is-required
        >
          <BaseOption
            v-for="role in userRolesArray"
            :key="role"
            :value="role"
            :name="getRoleTranslation(role)"
          />
        </BaseSelect>
      </div>
      <div
        v-if="userStore.isCurrentUserAdmin"
        class="col-span-12 space-y-2 sm:col-span-6"
      >
        <BaseSelect
          label="Abonnement"
          name="subscription"
          placeholder="Choisissez un abonnement"
          :display-value="getSuscriptionTranslation(values.subscription)"
          is-required
        >
          <BaseOption
            v-for="subscription in subscriptionArray"
            :key="subscription"
            :value="subscription"
            :name="getSuscriptionTranslation(subscription)"
          />
        </BaseSelect>
      </div>
    </div>

    <div class="flex items-center justify-center w-full mt-12">
      <BaseButton
        :disabled="!meta.valid || !meta.dirty || isSubmitting"
        :is-loading="uiStore.getUIIsLoading || isSubmitting"
        type="submit"
      >
        <template #icon>
          <ArrowDownOnSquareIconOutline />
        </template>
        Enregistrer
      </BaseButton>
    </div>
  </Form>
</div>

<div class="relative px-4 py-5 mt-4 space-y-12 shadow rounded-2xl sm:rounded-lg">
  <div class="flex items-center">
    <h5 class="px-6 py-4 text-xl font-medium">
      Votre logo
    </h5>
    <ArrowDownCircleIconOutline class="w-6 h-6 text-gray-600" />
  </div>

  <div class="px-6 py-4 space-y-12">
    <div>
      <FormsInputFile
        message="Sélectionnez votre logo"
        :url="userLogoUrl"
        @uploadFile="uploadFile"
      />
    </div>
    <div class="flex items-center justify-center">
      <BaseButton
        :disabled="!file || uiStore.getUIIsLoading"
        :is-loading="uiStore.getUIIsLoading"
        @click="submitFile"
      >
        <template #icon>
          <ArrowDownOnSquareIconOutline />
        </template>
        Enregistrer le Logo
      </BaseButton>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { object, string } from 'yup'
import { Form } from 'vee-validate'
import { FileTypeEnum, RoleEnum, subscriptionArray, userRolesArray } from '@/types'
import type { UserType, VeeValidateValues } from '@/types'
import { useFileStore, useUiStore, useUserStore } from '~~/store'

interface Props {
  id: number | null
}

const props = withDefaults(defineProps<Props>(), {
  id: null,
})

const router = useRouter()
const userStore = useUserStore()
const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
const fileStore = useFileStore()
const { patchOne, getRoleTranslation } = userHook()
const { getSuscriptionTranslation } = subscriptionHook()
const { postLogo } = fileHook()

const user = computed(() => {
  if (props.id)
    return userStore.getOne(props.id)

  return null
})

const userLogoUrl = computed(() => fileStore.getWhereArray(file => file.createdByUser === props.id && file.type === FileTypeEnum.LOGO)[0]?.secure_url)

const file = ref<null | FormData>(null)

const schema = object({
  companyName: string().nullable().label('Nom de l\'entreprise'),
  email: string().email('vous devez entrer in email valide').required('L\'adresse email est requise'),
  firstName: string().required('Le prenom est requis'),
  lastName: string().required('Le nom est requis'),
  siret: string().nullable().label('N° Siret'),
  roles: string().oneOf(userRolesArray).required('le role est requis'),
  subscription: string().oneOf(subscriptionArray).required('L\'abonnement est requis'),
})

const initialValues = {
  companyName: user.value?.companyName || '',
  email: user.value?.email || '',
  firstName: user.value?.firstName || '',
  lastName: user.value?.lastName || '',
  siret: user.value?.siret || '',
  roles: user.value?.roles || RoleEnum.USER,
  subscription: user.value?.subscription || null,
}

function uploadFile(fileUploaded: File) {
  // TODO how to post/patch a file base64
  const formData = new FormData()
  formData.append('file', fileUploaded)
  file.value = formData
}

async function submit(form: VeeValidateValues) {
  IncLoading()
  if (props.id) {
    const payload = {
      ...user.value,
      ...form,
    }
    delete payload.profilePicture
    delete payload.events
    delete payload.employee
    delete payload.files
    await patchOne(props.id, payload as UserType)
    router.push({
      name: userStore.isCurrentUserAdmin ? 'admin.users.show' : 'user.account',
      params: {
        userId: props.id,
      },
    })
  }
  DecLoading()
}

async function submitFile() {
  if (file.value) {
    IncLoading()
    await postLogo(file.value)
    DecLoading()
  }
}
</script>
