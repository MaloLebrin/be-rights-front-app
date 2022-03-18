<template>
  <form class="grid w-full h-full grid-cols-1 gap-6 px-6 mt-4 md:grid-cols-3">
    <BField
      class="col-span-3"
      :class="nameMeta.valid ? 'text-red-500' : 'text-gray-800 dark:text-gray-300'"
      label="Nom de l'événement"
      labelFor="name"
      :message="nameError"
      :status="nameMeta.valid ? 'success' : 'error'"
    >
      <BInput class="text-white dark:text-blue-dark" type="text" id="name" v-model="name" />
    </BField>
    <BField
      :class="datesMeta.valid ? 'text-red-500' : 'text-gray-800 dark:text-gray-300'"
      label="Dates"
      labelFor="dates"
      :message="datesError"
      :status="datesMeta.valid ? 'success' : 'error'"
    >
      <v-date-picker
        v-model="period"
        mode="dateTime"
        :is-dark="isDarkTheme"
        is-range
        is24hr
        is-expanded
      />
    </BField>

    <div class="col-span-2">
      <BField
        :class="addressMeta.valid ? 'text-red-500 dark:text-red-500' : 'text-gray-800 dark:text-gray-300'"
        label="Adresse"
        labelFor="address"
        :message="addressError"
        :status="addressMeta.valid ? 'success' : 'error'"
      >
        <BInput class="text-white dark:text-blue-dark" type="text" id="address" v-model="address" />
      </BField>
      <BField
        :class="postalCodeMeta.valid ? 'text-red-500 dark:text-red-500' : 'text-gray-800 dark:text-gray-300'"
        label="Code postal"
        labelFor="postalCode"
        :message="postalCodeError"
        :status="postalCodeMeta.valid ? 'success' : 'error'"
      >
        <BInput
          class="text-white dark:text-blue-dark"
          type="text"
          id="postalCode"
          v-model="postalCode"
        />
      </BField>
      <BField
        :class="cityMeta.valid ? 'text-red-500 dark:text-red-500' : 'text-gray-800 dark:text-gray-300'"
        label="Ville"
        labelFor="city"
        :message="cityError"
        :status="cityMeta.valid ? 'success' : 'error'"
      >
        <BInput class="text-white dark:text-blue-dark" type="text" id="city" v-model="city" />
      </BField>
      <BField
        :class="countryMeta.valid ? 'text-red-500 dark:text-red-500' : 'text-gray-800 dark:text-gray-300'"
        label="Pays"
        labelFor="country"
        :message="countryError"
        :status="countryMeta.valid ? 'success' : 'error'"
      >
        <BInput class="text-white dark:text-blue-dark" type="text" id="country" v-model="country" />
      </BField>
    </div>
    <BField
      v-if="isCurrentUserAdmin"
      class="col-span-2"
      :class="userIdMeta.valid ? 'text-red-500 dark:text-red-500' : 'text-gray-800 dark:text-gray-300'"
      label="Utilisateur"
      labelFor="userId"
      :message="userIdError"
      :status="userIdMeta.valid ? 'success' : 'error'"
    >
      <InputSearchSelect baseUrl="user" @selected="handleUserId" />
    </BField>
    <BField
      class="col-span-2"
      label="Destinataires"
      labelFor="employee"
      :message="employeeError"
      :status="employeeMeta.valid ? 'success' : 'error'"
    >
      <InputSearchSelect
        :baseUrl="isCurrentUserAdmin ? 'employee' : `employee?filters[createdByUser]=${getCurrentUserId}`"
        @selected="handleEmployee"
        is-multiple
      />
    </BField>
  </form>
  <div class="flex items-center justify-center mt-6">
    <BButton
      :disabled="!meta.valid || !meta.dirty"
      variant="white"
      class="mr-2 dark:text-black"
      @click="submit"
    >
      <template #icon>
        <SaveIconOutline />
      </template>
      {{ mode === ModalModeEnum.CREATE ? 'Créer' : 'Enregistrer' }}
    </BButton>
  </div>
</template>

<script setup lang="ts">
import { EmployeeType, EventType, ModalModeEnum } from '@/types/typesExported'
import type { Period } from '@/types'
import { useField, useForm } from 'vee-validate'
import { object, string, date, number } from 'yup'
import useMainStore from '@/store/main/mainStore';
import { useEventStore, useUserStore, useUiStore } from '@/store'

interface Props {
  eventId?: number | null
  mode?: ModalModeEnum | null
}
const props = withDefaults(defineProps<Props>(), {
  eventId: null,
  mode: null,
})

const mainStore = useMainStore()
const eventStore = useEventStore()
const userStore = useUserStore()
const uiStore = useUiStore()
const { isDarkTheme } = mainStore
const { isCurrentUserAdmin, getCurrentUserId } = userStore
const { getUiModalState, IncLoading, DecLoading, resetUiModalState } = uiStore
const { postMany: postManyAnswers } = answerHook()
const { postOne: PostOneEvent, patchOne: patchOneEvent } = eventHook()

const event = computed(() => props.eventId ? eventStore.getOne(props.eventId) : null)

const schema = object({
  name: string().required('le nom de l\'événement est obligatoire').label('Nom'),
  period: object().shape({
    start: date().required().label('Début'),
    end: date().required().label('Fin'),
  }).required().label('Dates'),
  address: string().required('L\'adresse est obligatoire').label('Adresse'),
  postalCode: string().required('Le code postal est obligatoire').label('Code postal'),
  city: string().required('La ville est obligatoire').label('Ville'),
  country: string().required('Le pays est obligatoire').label('Pays'),
  userId: number().required().label('Utilisateur'),
})

const { meta } = useForm({ validationSchema: schema })

const { errorMessage: nameError, value: name, meta: nameMeta } = useField<string>('name', undefined, {
  initialValue: event.value ? event.value.name : '',
})
const { errorMessage: datesError, meta: datesMeta, value: period } = useField<Period>('period', undefined, {
  initialValue: event.value ? { start: event.value.start, end: event.value.end } : { start: new Date(), end: new Date() },
})
const { errorMessage: addressError, value: address, meta: addressMeta } = useField<string | null>('address', undefined, {
  initialValue: event.value ? event.value.address : '',
})
const { errorMessage: postalCodeError, value: postalCode, meta: postalCodeMeta } = useField<string | null>('postalCode', undefined, {
  initialValue: event.value ? event.value.postalCode : '',
})
const { errorMessage: cityError, value: city, meta: cityMeta } = useField<string | null>('city', undefined, {
  initialValue: event.value ? event.value.city : '',
})
const { errorMessage: countryError, value: country, meta: countryMeta } = useField<string | null>('country', undefined, {
  initialValue: event.value ? event.value.country : '',
})
const { errorMessage: userIdError, value: userId, meta: userIdMeta, handleChange: handleUserId } = useField<number | null>('userId', undefined, {
  initialValue: event.value ? event.value.createdByUser as number : null,
})

const { errorMessage: employeeError, value: employees, meta: employeeMeta, handleChange: handleEmployee } = useField<EmployeeType[] | null>('employees', undefined, {
  initialValue: event.value ? event.value.employees as unknown as EmployeeType[] : [],
})

const userCreateEvent = computed(() => {
  if (isCurrentUserAdmin) {
    return userId.value
  } else {
    return getCurrentUserId
  }
})

async function submit() {
  IncLoading()

  const payload = {
    name: name.value,
    start: period.value.start,
    end: period.value.end,
    address: address.value,
    postalCode: postalCode.value,
    city: city.value,
    country: country.value,
    createdByUser: userCreateEvent.value,
  }

  if (getUiModalState.modalMode === ModalModeEnum.CREATE) {
    if (userCreateEvent.value) {
      const newEvent = await PostOneEvent(payload as EventType, userCreateEvent.value!)
      if (employees.value && employees.value.length > 0 && newEvent) {
        const employeesIds = employees.value.map(employee => employee.id)
        const eventId = newEvent.id
        await postManyAnswers(
          eventId,
          employeesIds
        )
      }
    }
  }
  if (getUiModalState.modalMode === ModalModeEnum.EDIT && props.eventId) {

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
  }
  DecLoading()
  resetUiModalState()
}
</script>