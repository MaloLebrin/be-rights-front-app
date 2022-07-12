<template>
<form class="grid w-full h-full grid-cols-1 gap-6 mt-4 md:gap-12 md:grid-cols-3">
  <div class="space-y-2 md:col-span-3">
    <label class="block mb-2 text-lg font-bold text-blue dark:text-gray-100">Nom de l'événement&nbsp;*&nbsp;:</label>
    <BaseInput
      id="name"
      v-model="name"
      type="text"
      :error="nameError"
    />
  </div>

  <div class="space-y-2">
    <label class="block mb-2 text-lg font-bold text-blue dark:text-gray-100">Dates de
      l'événement&nbsp;*&nbsp;:</label>
    <v-date-picker
      v-model="period"
      mode="dateTime"
      :is-dark="mainStore.isDarkTheme"
      is-range
      is24hr
      is-expanded
    />
    <p v-if="datesError?.length">
      {{ datesError }}
    </p>
  </div>

  <BaseTextarea
    v-model="description"
    class="md:col-span-2"
    label="Description de l'événement"
    :error="descriptionError"
    is-required
  />

  <div class="col-span-3 space-y-2">
    <label
      class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
    >Adresse&nbsp;*&nbsp;:</label>
    <BaseInput
      id="addressLine"
      v-model="addressLine"
      type="text"
      :error="addressLineError"
    />
  </div>

  <div class="col-span-3 space-y-2">
    <label class="block mb-2 text-lg font-bold text-blue dark:text-gray-100">Addresse complément&nbsp;:</label>
    <BaseInput
      id="addressLine2"
      v-model="addressLine2"
      type="text"
      :error="addressLine2Error"
    />
  </div>

  <div class="space-y-2">
    <label
      class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
    >Code postal&nbsp;*&nbsp;:</label>
    <BaseInput
      id="postalCode"
      v-model="postalCode"
      :error="postalCodeError"
    />
  </div>

  <div class="space-y-2">
    <label
      class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
    >Ville&nbsp;*&nbsp;:</label>
    <BaseInput
      id="city"
      v-model="city"
      :error="cityError"
    />
  </div>
  <div class="space-y-2">
    <label
      class="block mb-2 text-lg font-bold text-blue dark:text-gray-100"
    >Pays&nbsp;*&nbsp;:</label>
    <BaseInput
      id="country"
      v-model="country"
      :error="countryError"
    />
  </div>

  <div
    v-if="userStore.isCurrentUserAdmin && mode !== ModalModeEnum.EDIT"
    class="space-y-2 md:col-span-3"
  >
    <label class="block mb-2 text-lg font-bold text-blue dark:text-gray-100">Id de l'utilisateur&nbsp;*&nbsp;:</label>
    <InputSearchSelect
      base-url="user"
      @selected="onSelectedUser"
    />
    <p v-if="userIdError?.length">
      {{ userIdError }}
    </p>
  </div>

  <div class="space-y-2 md:col-span-3">
    <label class="block mb-2 text-lg font-bold text-blue dark:text-gray-100">Destinataires&nbsp;*&nbsp;:</label>
    <InputSearchSelect
      :base-url="userStore.isCurrentUserAdmin ? 'employee' : `employee?filters[createdByUser]=${userStore.getCurrentUserId}`"
      is-multiple
      :default-value="eventEmployees"
      @selected="handleEmployee"
    />
    <p v-if="employeeError?.length">
      {{ employeeError }}
    </p>
  </div>
</form>

<div class="flex items-center justify-center mt-6">
  <BaseButton
    :disabled="!meta.valid || !meta.dirty"
    @click="submit"
  >
    <template #icon>
      <SaveIconOutline />
    </template>
    {{ mode === ModalModeEnum.CREATE ? 'Créer' : 'Enregistrer' }}
  </BaseButton>
</div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { date, number, object, string } from 'yup'
import type { EmployeeType, EventType, Period, UserType } from '@/types'
import { ModalModeEnum } from '@/types'

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
const addressStore = useAddressStore()
const employeeStore = useEmployeeStore()

const { IncLoading, DecLoading, resetUiModalState } = uiStore
const { postMany: postManyAnswers } = answerHook()
const { postOne: PostOneEvent, patchOne: patchOneEvent } = eventHook()
const { isUserType } = userHook()
const { postOne: postOneAddress, patchOne: patchOneAddress } = addressHook()

const event = computed(() => props.eventId ? eventStore.getOne(props.eventId) : null)
const eventAddress = computed(() => {
  if (event.value) {
    const address = addressStore.getOne(event.value.address as number)
    if (!address) {
      return addressStore.getOneByEventId(event.value.id) || null
    }
    return address
  }
  return null
})

const schema = object({
  name: string().required('le nom de l\'événement est obligatoire'),
  description: string(),
  period: object().shape({
    start: date().required('La date de début est obligatoire'),
    end: date().required('La date de fin est obligatoire'),
  }).required('L\'événement doit avoir une date de début et une date de fin'),
  userId: number().required('L\'utilisateur est obligatoire'),
  addressLine: string().required('L\'adresse est requise'),
  addressLine2: string(),
  postalCode: string().required('Le code postal est requis'),
  city: string().required('La ville est requise'),
  country: string().required('Le pays est requis'),

})

const userCreateEvent = computed(() => {
  if (userStore.isCurrentUserAdmin) {
    return event.value ? isUserType(event.value.createdByUser) ? event.value.createdByUser.id : event.value.createdByUser as number : null
  } else {
    return userStore.getCurrentUserId
  }
})
const eventEmployees = computed(() => props.eventId ? employeeStore.getAllByEventId(props.eventId) : [])

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
const { errorMessage: userIdError, value: userId, handleChange: handleUserId } = useField<number | null>('userId', undefined, {
  initialValue: userCreateEvent.value,
})
const { errorMessage: employeeError, value: employees, handleChange: handleEmployee } = useField<EmployeeType[] | null>('employees', undefined, {
  initialValue: event.value ? eventEmployees.value : [],
})

const { errorMessage: addressLineError, value: addressLine } = useField<string>('addressLine', undefined, {
  initialValue: eventAddress.value ? eventAddress.value.addressLine : '',
})
const { errorMessage: addressLine2Error, value: addressLine2 } = useField<string | null>('addressLine2', undefined, {
  initialValue: eventAddress.value ? eventAddress.value.addressLine2 : null,
})
const { errorMessage: postalCodeError, value: postalCode } = useField<string>('postalCode', undefined, {
  initialValue: eventAddress.value ? eventAddress.value.postalCode : '',
})
const { errorMessage: cityError, value: city } = useField<string>('city', undefined, {
  initialValue: eventAddress.value ? eventAddress.value.city : '',
})

const { errorMessage: countryError, value: country } = useField<string>('country', undefined, {
  initialValue: eventAddress.value ? eventAddress.value.country : 'France',
})

function onSelectedUser(user: UserType) {
  handleUserId(user.id)
}

async function submit() {
  IncLoading()

  const payload = {
    event: {
      name: name.value,
      description: description.value,
      start: period.value.start,
      end: period.value.end,
      createdByUser: userId.value!,
    },
  }

  if (props.mode === ModalModeEnum.CREATE) {
    if (userId.value) {
      const newEvent = await PostOneEvent(payload.event, userId.value)
      if (newEvent) {
        if (employees.value && employees.value.length > 0) {
          const employeesIds = employees.value.map(employee => employee.id)
          const eventId = newEvent.id
          await postManyAnswers(
            eventId,
            employeesIds,
          )
          await postOneAddress({
            address: {
              addressLine: addressLine.value,
              addressLine2: addressLine2.value,
              postalCode: postalCode.value,
              city: city.value,
              country: country.value,
            },
            eventId: newEvent.id,
          })
        }

        emit('submitted', newEvent.id)
      }
    }
  }

  if (props.mode === ModalModeEnum.EDIT && props.eventId) {
    const payload = {
      ...event.value,
      name: name.value,
      description: description.value,
      start: period.value.start,
      end: period.value.end,
    }
    await patchOneEvent(payload as EventType)
    if (eventAddress.value) {
      await patchOneAddress(eventAddress.value.id, {
        addressLine: addressLine.value,
        addressLine2: addressLine2.value || null,
        postalCode: postalCode.value,
        city: city.value,
        country: country.value,
      })
    }

    if (employees.value && employees.value.length > 0) {
      const employeesIds = employees.value.map(employee => employee.id)
      const eventId = props.eventId
      await postManyAnswers(
        eventId,
        employeesIds,
      )
    }
    emit('submitted', props.eventId)
  }
  DecLoading()
  resetUiModalState()
}
</script>
