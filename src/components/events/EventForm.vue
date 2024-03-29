<template>
<Form
  v-slot="{ meta, isSubmitting, values }"
  :validation-schema="schema"
  :initial-values="initialValues"
  class="grid w-full grid-cols-1 gap-6 mt-4 md:grid-cols-3 mb-36"
  @submit="submit"
>
  <div class="col-span-2 md:col-span-3">
    <BaseInput
      label="Nom de l'événement"
      name="name"
      autocomplete="name"
      is-required
    />
  </div>

  <div class="space-y-2">
    <label class="block mb-2 text-sm font-bold text-blue dark:text-gray-100">
      Dates de l'événement&nbsp;*&nbsp;:
    </label>
    <Field
      v-slot="{ field }"
      name="period"
    >
      <v-date-picker
        v-model="values.period"
        v-bind="field"
        color="purple"
        is-required
        locale="fr"
        mode="dateTime"
        :is-dark="mainStore.isDarkTheme"
        is-range
        is24hr
        is-expanded
      />
    </Field>
    <ErrorMessage name="period" />
  </div>

  <BaseTextarea
    class="md:col-span-2"
    label="Description de l'événement"
    name="description"
    autocomplete="description"
  />
  <template v-if="eventId && isEditMode">
    <div class="col-span-3">
      <BaseInput
        label="Adresse"
        name="addressLine"
        autocomplete="addressLine"
        is-required
      />
    </div>

    <div class="col-span-3">
      <BaseInput
        label="Complément d'adresse"
        name="addressLine2"
        autocomplete="addressLine"
      />
    </div>

    <BaseInput
      label="Code postal"
      name="postalCode"
      autocomplete="postalCode"
      is-required
    />

    <BaseInput
      label="Ville"
      name="city"
      autocomplete="city"
      is-required
    />

    <BaseInput
      label="Pays"
      name="country"
      autocomplete="country"
      is-required
    />
  </template>

  <div
    v-if="userStore.isCurrentUserAdmin && !isEditMode"
    class="space-y-2 md:col-span-3"
  >
    <UserSearchInput
      label="Choix de l'utilisateur"
      name="userId"
      value-key="id"
      placeholder="Choisissez un utilisateur"
      is-required
    />
  </div>

  <template v-if="!userStore.isCurrentUserAdmin && userStore.getCurrentUserId">
    <BaseMultipleSelect
      :values="employeeStore.getEmployeesByUserId(userStore.getCurrentUserId)"
      value-key="id"
      :display-key="getEmployeeFullname"
      label="Choix des destinataires"
      name="employees"
      placeholder="Choisissez des destinataires"
      is-required
      wrapper-classes="col-span-2 md:col-span-1"
    />
  </template>
  <div
    v-else
    class="space-y-2 md:col-span-3"
  >
    <EmployeeSearchInput
      label="Choix de destinataires"
      name="employees"
      value-key="id"
      placeholder="Choisissez un destinataires"
      is-required
    />
  </div>

  <div class="flex items-center justify-center mt-6 md:col-span-3">
    <BaseButton
      :disabled="!meta.valid || !meta.dirty"
      :is-loading="uiStore.getUIIsLoading || isSubmitting"
      type="submit"
    >
      <template #icon>
        <ArrowDownOnSquareIconOutline />
      </template>
      {{ !isEditMode ? 'Créer' : 'Enregistrer' }}
    </BaseButton>
  </div>
</Form>
</template>

<script setup lang="ts">
import type { InferType } from 'yup'
import { array, date, number, object, string } from 'yup'
import { ModalModeEnum } from '@/types'
import type { BaseCreationFormType, EventType, VeeValidateValues } from '@/types'
import { uniq } from '@/utils'

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
const { setCreationForm } = eventStore
const userStore = useUserStore()
const uiStore = useUiStore()
const addressStore = useAddressStore()
const employeeStore = useEmployeeStore()
const answerStore = useAnswerStore()
const router = useRouter()

const { IncLoading, DecLoading, resetUiModalState } = uiStore
const { postMany: postManyAnswers } = answerHook()
const { patchOne: patchOneAddress, postOne: postOneAddress } = addressHook()
const { patchOne: patchOneEvent } = eventHook()
const { isUserType } = userHook()
const { getEmployeeFullname } = employeeHook()
const { getRouteName } = authHook()

const isEditMode = computed(() => props.mode === ModalModeEnum.EDIT)
const event = computed(() => props.eventId ? eventStore.getOne(props.eventId) : null)
const eventAddress = computed(() => {
  if (event.value) {
    const address = addressStore.getOne(event.value.addressId as number)
    if (!address) {
      return addressStore.getOneByEventId(event.value.id) || null
    }
    return address
  }
  return null
})

interface IForm extends InferType<typeof schema> {}

const schema = object({
  name: string().required('le nom de l\'événement est obligatoire'),
  description: string().nullable(),
  period: object().shape({
    start: date().required('La date de début est obligatoire'),
    end: date().required('La date de fin est obligatoire'),
  }).required('L\'événement doit avoir une date de début et une date de fin'),
  addressLine: isEditMode.value ? string().required('L\'adresse est requise') : string().nullable(),
  addressLine2: string().nullable(),
  postalCode: isEditMode.value ? string().required('Le code postal est requis') : string().nullable(),
  city: isEditMode.value ? string().required('La ville est requise') : string().nullable(),
  country: isEditMode.value ? string().required('Le pays est requis') : string().nullable(),
  userId: number().required('L\'utilisateur est obligatoire'),
  employees: array().of(number()).min(1, 'Sélectionnez au moins un destinataire')
    .required('Les destinataires sont obligatoire'),
})

const userCreateEvent = computed(() => {
  if (userStore.isCurrentUserAdmin) {
    return event.value ? isUserType(event.value.createdByUser) ? event.value.createdByUser.id : event.value.createdByUser as number : null
  } else {
    return userStore.getCurrentUserId
  }
})

const eventEmployees = computed(() => props.eventId ? employeeStore.getAllByEventId(props.eventId).map(emp => emp.id) : [])

const initialValues = {
  name: event.value?.name || eventStore.getCreationForm.name,
  description: event.value?.description || eventStore.getCreationForm.description,
  period: {
    start: event.value?.start || eventStore.getCreationForm.start,
    end: event.value?.end || eventStore.getCreationForm.end,
  },
  addressLine: eventAddress.value?.addressLine || addressStore.getCreationForm.addressLine,
  addressLine2: eventAddress.value?.addressLine2 || addressStore.getCreationForm.addressLine2,
  postalCode: eventAddress.value?.postalCode || addressStore.getCreationForm.postalCode,
  city: eventAddress.value?.city || addressStore.getCreationForm.city,
  country: eventAddress.value?.country || addressStore.getCreationForm.country || 'France',
  userId: userCreateEvent.value,
  employees: eventEmployees.value,
}

async function submit(form: VeeValidateValues) {
  IncLoading()
  const formValues = form as IForm
  const payload = {
    event: {
      name: formValues.name,
      description: formValues.description,
      start: formValues.period.start as Date,
      end: formValues.period.end as Date,
      createdByUser: formValues.userId,
      employeeIds: formValues.employees,
    },
  }

  if (!isEditMode.value) {
    if (formValues.userId) {
      setCreationForm(payload.event as BaseCreationFormType)
      router.push({
        name: getRouteName('events.create'),
        query: { step: 'address' },
      })
    }
  }

  if (isEditMode.value && props.eventId) {
    const payload = {
      ...event.value,
      name: formValues.name,
      description: formValues.description,
      start: formValues.period.start,
      end: formValues.period.end,
    }
    await patchOneEvent(payload as EventType)
    if (eventAddress.value && formValues.addressLine && formValues.postalCode && formValues.city && formValues.country) {
      if (eventAddress.value.id) {
        await patchOneAddress(eventAddress.value.id, {
          addressLine: formValues.addressLine,
          addressLine2: formValues.addressLine2,
          postalCode: formValues.postalCode,
          city: formValues.city,
          country: formValues.country,
        })
      } else {
        await postOneAddress({
          address: {
            addressLine: formValues.addressLine,
            addressLine2: formValues.addressLine2,
            postalCode: formValues.postalCode,
            city: formValues.city,
            country: formValues.country,
          },
          eventId: props.eventId,
        })
      }
    }

    if (formValues.employees && formValues.employees.length > 0) {
      const employeesIds = formValues.employees.filter(id => id) as number[]
      const answerAlreadyCreated = answerStore.getManyByEventId(props.eventId).map(answer => answer.employee)
      const empToCreateAnswer = employeesIds.filter(empId => !answerAlreadyCreated.includes(empId))
      const eventId = props.eventId
      if (empToCreateAnswer?.length > 0) {
        await postManyAnswers(
          eventId,
          uniq(empToCreateAnswer),
        )
      }
    }
    emit('submitted', props.eventId)
    router.push({
      name: getRouteName('events.show'),
      params: {
        eventId: props.eventId,
      },
    })
  }
  DecLoading()
  resetUiModalState()
}
</script>
