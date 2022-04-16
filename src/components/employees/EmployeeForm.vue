<template>
<div class="w-full h-full px-4 mt-4">
  <form class="grid grid-cols-2 gap-4">
    <div class="space-y-2">
      <label
        class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
      >Prénom&nbsp;*&nbsp;:</label>
      <BaseInput
        id="firstName"
        v-model="firstName"
        type="text"
        :error="firstNameError"
      />
    </div>

    <div class="space-y-2">
      <label class="block mb-2 text-lg font-bold text-blue dark:text-gray-100">Nom&nbsp;*&nbsp;:</label>
      <BaseInput
        id="lastName"
        v-model="lastName"
        type="text"
        :error="lastNameError"
      />
    </div>

    <div class="space-y-2">
      <label
        class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
      >E-mail&nbsp;*&nbsp;:</label>
      <BaseInput
        id="email"
        v-model="email"
        type="email"
        :error="emailError"
      />
    </div>

    <div class="space-y-2">
      <label
        class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
      >Téléphone&nbsp;*&nbsp;:</label>
      <BaseInput
        id="phone"
        v-model="phone"
        type="tel"
        :error="phoneError"
      />
    </div>

    <div
      v-if="isCurrentUserAdmin && ModalModeEnum.CREATE"
      class="space-y-2 md:col-span-2"
    >
      <label
        class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
      >Id de l'utilisateur&nbsp;*&nbsp;:</label>
      <InputSearchSelect
        base-url="user"
        @selected="onSelectUser"
      />
      <p
        v-if="userIdError?.length"
        class="text-sm text-red-500"
      >
        {{ userIdError }}
      </p>
    </div>
  </form>

  <div class="flex items-center justify-center mt-6">
    <BaseButton
      :disabled="!meta.valid || !meta.dirty"
      @click.prevent="submit"
    >
      <template #icon>
        <SaveIconOutline />
      </template>
      {{ mode === ModalModeEnum.CREATE ? 'Créer' : 'Enregistrer' }}
    </BaseButton>
  </div>
</div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { number, object, string } from 'yup'
import type { EmployeeType, UserType } from '@/types/typesExported'
import { ModalModeEnum } from '@/types/typesExported'

interface Props {
  employee?: EmployeeType | null
  mode?: ModalModeEnum
  eventId?: number
  userId?: number
}

const props = withDefaults(defineProps<Props>(), {
  employee: null,
  mode: ModalModeEnum.CREATE,
  eventId: 0,
  userId: 0,
})

const { isCurrentUserAdmin, getCurrentUserId } = useUserStore()
const userStore = useUserStore()
const eventStore = useEventStore()
const { IncLoading, DecLoading } = useUiStore()
const { patchOne, postOne, postManyForEvent } = employeeHook()

const schema = object({
  email: string().email().required('L\'adresse email est requise'),
  firstName: string().required('Le prénom est requis'),
  lastName: string().required('Le nom est requis'),
  phone: string().required('Le numéro de téléphone est requis'),
  userId: number().required('L\'identifiant de l\'utilisateur est requis'),
})

const userIdField = computed(() => {
  if (props.employee) {
    return props.employee.createdByUser as number
  }
  if (isCurrentUserAdmin) {
    return null
  }
  return getCurrentUserId
})

const { meta } = useForm({ validationSchema: schema })
const { errorMessage: emailError, value: email } = useField<string>('email', undefined, {
  initialValue: props.employee ? props.employee.email : '',
})
const { errorMessage: phoneError, value: phone } = useField<string>('phone', undefined, {
  initialValue: props.employee ? props.employee.phone : '',
})
const { errorMessage: firstNameError, value: firstName } = useField<string>('firstName', undefined, {
  initialValue: props.employee ? props.employee.firstName : '',
})
const { errorMessage: lastNameError, value: lastName } = useField<string>('lastName', undefined, {
  initialValue: props.employee ? props.employee.lastName : '',
})

const { errorMessage: userIdError, value: userId, handleChange: handleNewUserId } = useField<number | null>('userId', undefined, {
  initialValue: userIdField.value,
})

function onSelectUser(user: UserType) {
  handleNewUserId(user.id)
}

const emit = defineEmits<{
  (e: 'submit'): void
}>()

async function submit() {
  IncLoading()

  const employeeToPost = {
    email: email.value,
    firstName: firstName.value,
    lastName: lastName.value,
    phone: phone.value,
  } as EmployeeType

  if (props.mode === ModalModeEnum.CREATE) {
    if (props.eventId) {
      const createdByUser = eventStore.getOne(props.eventId)?.createdByUser as number
      await postManyForEvent([employeeToPost],
        props.eventId, createdByUser)
    } else {
      if (userStore.getCurrentUserId) {
        const createdByUser = isCurrentUserAdmin ? userId.value! : userStore.getCurrentUserId
        await postOne(employeeToPost, createdByUser)
      }
    }
  } else if (props.mode === ModalModeEnum.EDIT && props.employee) {
    await patchOne(props.employee.id, { ...employeeToPost, createdByUser: props.employee.createdByUser })
  }
  emit('submit')
  DecLoading()
}
</script>
