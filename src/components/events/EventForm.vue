<template>
  <form class="grid w-full h-full grid-cols-1 gap-6 px-6 mt-4 md:gap-12 md:grid-cols-3">
    <div class="space-y-2 md:col-span-3">
      <label
        class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
      >Nom de l'événement&nbsp;*&nbsp;:</label>
      <BaseInput
        class="text-white dark:text-blue-dark"
        type="text"
        id="name"
        v-model="name"
        :error="nameError"
      />
    </div>

    <div class="space-y-2">
      <label
        class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
      >Dates de l'événement&nbsp;*&nbsp;:</label>
      <v-date-picker
        v-model="period"
        mode="dateTime"
        :is-dark="mainStore.isDarkTheme"
        is-range
        is24hr
        is-expanded
      />
      <p v-if="datesError?.length">{{ datesError }}</p>
    </div>

    <BaseTextarea
      v-model="description"
      class="md:col-span-2"
      label="Description de l'événement"
      :error="descriptionError"
      is-required
    />

    <div class="space-y-2 md:col-span-2">
      <label class="block mb-2 text-lg font-bold text-blue dark:text-gray-100">Adresse&nbsp;*&nbsp;:</label>
      <BaseInput
        class="text-white dark:text-blue-dark"
        type="text"
        id="address"
        v-model="address"
        :error="addressError"
      />
    </div>
    <div class="space-y-2">
      <label
        class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
      >Code postal&nbsp;*&nbsp;:</label>
      <BaseInput
        class="text-white dark:text-blue-dark"
        type="text"
        id="postalCode"
        v-model="postalCode"
        :error="postalCodeError"
      />
    </div>

    <div class="grid grid-cols-1 gap-6 md:col-span-3 md:grid-cols-2">
      <div class="space-y-2">
        <label class="block mb-2 text-lg font-bold text-blue dark:text-gray-100">Ville&nbsp;*&nbsp;:</label>
        <BaseInput
          class="text-white dark:text-blue-dark"
          type="text"
          id="city"
          v-model="city"
          :error="cityError"
        />
      </div>
      <div class="space-y-2">
        <label class="block mb-2 text-lg font-bold text-blue dark:text-gray-100">Pays&nbsp;*&nbsp;:</label>
        <BaseInput
          class="text-white dark:text-blue-dark"
          type="text"
          id="country"
          v-model="country"
          :error="countryError"
        />
      </div>
    </div>

    <div v-if="userStore.isCurrentUserAdmin" class="space-y-2 md:col-span-3">
      <label
        class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
      >Id de l'utilisateur&nbsp;*&nbsp;:</label>
      <InputSearchSelect baseUrl="user" @selected="onSelectedUser" />
      <p v-if="userIdError?.length">{{ userIdError }}</p>
    </div>

    <div class="space-y-2 md:col-span-3">
      <label
        class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
      >Destinataires&nbsp;*&nbsp;:</label>
      <InputSearchSelect
        :baseUrl="userStore.isCurrentUserAdmin ? 'employee' : `employee?filters[createdByUser]=${userStore.getCurrentUserId}`"
        @selected="handleEmployee"
        is-multiple
      />
      <p v-if="employeeError?.length">{{ employeeError }}</p>
    </div>
  </form>

  <div class="flex items-center justify-center mt-6">
    <BaseButton :disabled="!meta.valid || !meta.dirty" @click="submit">
      <template #icon>
        <SaveIconOutline />
      </template>
      {{ mode === ModalModeEnum.CREATE ? 'Créer' : 'Enregistrer' }}
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { EmployeeType, EventType, ModalModeEnum, UserType } from '@/types/typesExported'
import type { Period } from '@/types'
import { useField, useForm } from 'vee-validate'
import { object, string, date, number } from 'yup'

interface Props {
  eventId?: number | null
  mode: ModalModeEnum | null
}
const props = withDefaults(defineProps<Props>(), {
  eventId: null,
  mode: null,
})

const emit = defineEmits<{
  (e: 'submitted', eventId: number): void
}>()

const mainStore = useMainStore()
const eventStore = useEventStore()
const userStore = useUserStore()
const uiStore = useUiStore()

const { IncLoading, DecLoading, resetUiModalState } = uiStore
const { postMany: postManyAnswers } = answerHook()
const { postOne: PostOneEvent, patchOne: patchOneEvent } = eventHook()

const event = computed(() => props.eventId ? eventStore.getOne(props.eventId) : null)

const schema = object({
  name: string().required('le nom de l\'événement est obligatoire'),
  description: string(),
  period: object().shape({
    start: date().required('La date de début est obligatoire'),
    end: date().required('La date de fin est obligatoire'),
  }).required('L\'événement doit avoir une date de début et une date de fin'),
  address: string().required('L\'adresse est obligatoire'),
  postalCode: string().required('Le code postal est obligatoire'),
  city: string().required('La ville est obligatoire'),
  country: string().required('Le pays est obligatoire'),
  userId: number().required('L\'utilisateur est obligatoire'),
})

const userCreateEvent = computed(() => {
  if (userStore.isCurrentUserAdmin) {
    return event.value ? event.value.createdByUser as number : null
  } else {
    return userStore.getCurrentUserId
  }
})

const { meta } = useForm({ validationSchema: schema })

const { errorMessage: nameError, value: name } = useField<string>('name', undefined, {
  initialValue: event.value?.name || '',
})
const { errorMessage: descriptionError, value: description } = useField<string>('description', undefined, {
  initialValue: event.value?.description || '',
})
const { errorMessage: datesError, value: period } = useField<Period>('period', undefined, {
  initialValue: event.value ? { start: event.value.start, end: event.value.end } : { start: new Date(), end: new Date() },
})
const { errorMessage: addressError, value: address } = useField<string | null>('address', undefined, {
  initialValue: event.value ? event.value.address : '',
})
const { errorMessage: postalCodeError, value: postalCode } = useField<string | null>('postalCode', undefined, {
  initialValue: event.value ? event.value.postalCode?.toString() : '',
})
const { errorMessage: cityError, value: city } = useField<string | null>('city', undefined, {
  initialValue: event.value ? event.value.city : '',
})
const { errorMessage: countryError, value: country } = useField<string | null>('country', undefined, {
  initialValue: event.value ? event.value.country : '',
})
const { errorMessage: userIdError, value: userId, handleChange: handleUserId } = useField<number | null>('userId', undefined, {
  initialValue: userCreateEvent.value,
})
const { errorMessage: employeeError, value: employees, handleChange: handleEmployee } = useField<EmployeeType[] | null>('employees', undefined, {
  initialValue: event.value ? event.value.employees as unknown as EmployeeType[] : [],
})

function onSelectedUser(user: UserType) {
  handleUserId(user.id)
}

async function submit() {
  IncLoading()

  const payload = {
    name: name.value,
    description: description.value,
    start: period.value.start,
    end: period.value.end,
    address: address.value,
    postalCode: postalCode.value,
    city: city.value,
    country: country.value,
    createdByUser: userId.value,
  }
  console.log(payload, 'payload')
  if (props.mode === ModalModeEnum.CREATE) {
    if (userId.value) {
      const newEvent = await PostOneEvent(payload as EventType, userId.value)
      if (newEvent) {
        if (employees.value && employees.value.length > 0) {
          const employeesIds = employees.value.map(employee => employee.id)
          const eventId = newEvent.id
          await postManyAnswers(
            eventId,
            employeesIds
          )
        }
        emit('submitted', newEvent.id)
      }
    }
  }

  if (props.mode === ModalModeEnum.EDIT && props.eventId) {
    await patchOneEvent({
      ...payload as EventType,
      id: props.eventId,
    })
    if (employees.value && employees.value.length > 0) {
      const employeesIds = employees.value.map(employee => employee.id)
      const eventId = props.eventId
      await postManyAnswers(
        eventId,
        employeesIds
      )
    }
    emit('submitted', props.eventId)
  }
  DecLoading()
  resetUiModalState()
}
</script>