<template>
  <div v-if="user" class="w-full h-full px-6 mt-4">
    <form class="grid grid-cols-2 gap-4">
      <BField
        label="Prénom"
        labelFor="firstName"
        :message="firstNameError"
        :status="firstNameMeta.valid ? 'success' : 'error'"
      >
        <BInput
          class="text-white dark:text-blue-dark"
          type="text"
          id="firstName"
          v-model="firstName"
        />
      </BField>
      <BField
        label="Nom"
        labelFor="lastName"
        :message="lastNameError"
        :status="lastNameMeta.valid ? 'success' : 'error'"
      >
        <BInput
          class="text-white dark:text-blue-dark"
          type="text"
          id="lastName"
          v-model="lastName"
        />
      </BField>
      <BField
        label="E-mail"
        labelFor="email"
        :message="emailError"
        :status="emailMeta.valid ? 'success' : 'error'"
      >
        <BInput class="text-white dark:text-blue-dark" type="email" id="email" v-model="email" />
      </BField>
      <BField
        label="Nom de l'entreprise"
        labelFor="companyName"
        :message="companyNameError"
        :status="companyNameMeta.valid ? 'success' : 'error'"
      >
        <BInput
          class="text-white dark:text-blue-dark"
          type="text"
          id="companyName"
          v-model="companyName"
        />
      </BField>
      <BField
        class="col-span-2"
        label="N° Siret"
        labelFor="siret"
        :message="siretError"
        :status="siretMeta.valid ? 'success' : 'error'"
      >
        <BInput class="text-white dark:text-blue-dark" type="text" id="siret" v-model="siret" />
      </BField>
      <BField
        v-if="isCurrentUserAdmin"
        label="Role"
        labelFor="role"
        :message="rolesError"
        :status="rolesMeta.valid ? 'success' : 'error'"
      >
        <Select
          :options="userRolesArray"
          :default="roles ? roles : 'Sélectionnez un Role'"
          @selected="roles = $event"
        />
      </BField>
      <BField
        v-if="isCurrentUserAdmin"
        label="Abonnement"
        labelFor="subscription"
        :message="subscriptionError"
        :status="subscriptionMeta.valid ? 'success' : 'error'"
      >
        <Select
          :options="subscriptionArray"
          :default="subscription ? subscription : 'Sélectionnez un Abonnement'"
          @selected="subscription = $event"
        />
      </BField>
    </form>
    <div class="mt-12 text-black-light text-blue dark:text-white-break">
      <Loader v-if="isLoading" :isLoading="isLoading" :type="LoaderTypeEnum.BOUNCE" />
      <div class="grid grid-cols-1 mb-12 md:grid-cols-2">
        <div
          :class="[activeClasse(1).value, 'text-center uppercase cursor-pointer text-blue dark:text-white-break font-bold text-xl']"
          @click="toggleActiveTab(1)"
        >Événements</div>
        <div
          :class="[activeClasse(2).value, 'text-center uppercase cursor-pointer text-blue dark:text-white-break font-bold text-xl']"
          @click="toggleActiveTab(2)"
        >Destinaires Enregistrés</div>
      </div>

      <div v-if="activeTabs === 1" class="space-y-12">
        <div class="space-y-24">
          <EventUserItem
            v-if="eventByUserId.length"
            v-for="event in eventByUserId"
            :key="event.id"
            :event="event"
          />
          <div v-else class="px-4 text-center text-gray-800 dark:text-gray-600">Aucun événement</div>
        </div>
      </div>

      <div v-if="activeTabs === 2" class="space-y-2">
        <EmployeeUserItem
          v-if="employeeByUserId.length"
          v-for="employee in employeeByUserId"
          :key="employee.id"
          :employee="employee"
        />
        <div
          v-else
          class="px-4 text-center text-gray-800 dark:text-gray-600"
        >Aucun destinataire enregistré</div>
      </div>
    </div>
    <div class="flex items-center justify-center w-full mt-12">
      <BButton
        variant="white"
        class="mt-4 dark:text-black"
        :disabled="!meta.valid || !meta.dirty"
        :loading="isLoading"
        @click="submit"
      >
        <template #icon>
          <SaveIconOutline />
        </template>
        Enregistrer
      </BButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEmployeeStore, useEventStore, useUserStore } from '@/store'
import { RoleEnum, userRolesArray, LoaderTypeEnum } from '@/types'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { subscriptionArray, SubscriptionEnum, UserType } from '@/types/typesExported'

interface Props {
  id: number
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined
})

const userStore = useUserStore()
const { isCurrentUserAdmin } = useUserStore()
const eventStore = useEventStore()
const employeeStore = useEmployeeStore()
const { patchOne } = userHook()
const { fetchAllByUserId: fetchAllEmployeeByUserId } = employeeHook()
const { fetchEventsByUser } = eventHook()

const user = computed(() => userStore.getOne(props.id))

const isLoading = ref(false)

const schema = yup.object({
  companyName: yup.string().nullable().label('Nom de l\'entreprise'),
  email: yup.string().email().required().label('Adresse email'),
  firstName: yup.string().required().label('Prénom'),
  lastName: yup.string().required().label('Nom'),
  siret: yup.string().nullable().label('N° Siret'),
  roles: yup.string().required().label('Role'),
  subscription: yup.string().required().label('Abonnement')
})

const { meta, errors } = useForm({ validationSchema: schema })
const { errorMessage: emailError, value: email, meta: emailMeta } = useField<string>('email', undefined, {
  initialValue: user.value ? user.value.email : '',
})
const { errorMessage: siretError, value: siret, meta: siretMeta } = useField<string>('siret', undefined, {
  initialValue: user.value ? user.value.siret : '',
})
const { errorMessage: companyNameError, value: companyName, meta: companyNameMeta } = useField<string>('companyName', undefined, {
  initialValue: user.value ? user.value.companyName : '',
})
const { errorMessage: firstNameError, value: firstName, meta: firstNameMeta } = useField<string>('firstName', undefined, {
  initialValue: user.value ? user.value.firstName : '',
})
const { errorMessage: lastNameError, value: lastName, meta: lastNameMeta } = useField<string>('lastName', undefined, {
  initialValue: user.value ? user.value.lastName : '',
})
const { value: roles, errorMessage: rolesError, meta: rolesMeta } = useField<RoleEnum>('roles', undefined, {
  initialValue: user.value ? user.value.roles : RoleEnum.USER,
})
const { value: subscription, errorMessage: subscriptionError, meta: subscriptionMeta } = useField<SubscriptionEnum | null>('subscription', undefined, {
  initialValue: user.value ? user.value.subscription : null
})

onMounted(async () => {
  isLoading.value = true
  const employeeIds = user.value?.employee as number[]
  const missingEmployeeIds = employeeIds.filter(id => !employeeStore.getOne(id))
  if (missingEmployeeIds.length > 0) {
    await fetchAllEmployeeByUserId(user.value.id)
  }
  const eventIds = user.value?.events as number[]
  const missingEventIds = eventIds.filter(id => !eventStore.getOne(id))
  if (missingEventIds.length > 0) {
    await fetchEventsByUser(user.value.id)
  }
  isLoading.value = false
})

const eventByUserId = computed(() => eventStore.getMany(user.value.events as number[]))

const employeeByUserId = computed(() => employeeStore.getEmployeesByUserId(user.value.id))

const emits = defineEmits<{
  (e: 'submit', id: number): void
}>()

async function submit() {
  isLoading.value = true

  const payload: UserType = {
    ...user.value,
    companyName: companyName.value,
    email: email.value,
    firstName: firstName.value,
    lastName: lastName.value,
    siret: siret.value,
    roles: roles.value,
    subscription: subscription.value!,
  }


  await patchOne(props.id, payload)
  isLoading.value = false
  emits('submit', props.id)
}

const activeTabs = ref(1)

const activeClasse = (tab: number) => computed(() => activeTabs.value === tab ? 'border-b-4 border-green-300' : '')

function toggleActiveTab(tab: number) {
  activeTabs.value = tab
}

</script>