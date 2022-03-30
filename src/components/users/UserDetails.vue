<template>
  <div v-if="user" class="w-full h-full px-6 mt-4">
    <form class="grid grid-cols-2 gap-4">
      <div class="space-y-2 text-blue dark:text-gray-100">
        <label class="block mb-2 text-lg font-bold">Prénom&nbsp;:</label>
        <p>{{ user.firstName }}</p>
      </div>

      <div class="space-y-2 text-blue dark:text-gray-100">
        <label class="block mb-2 text-lg font-bold">Nom&nbsp;:</label>
        <p>{{ user.lastName }}</p>
      </div>

      <div class="space-y-2 text-blue dark:text-gray-100">
        <label class="block mb-2 text-lg font-bold">E-mail&nbsp;:</label>
        <p>{{ user.email }}</p>
      </div>

      <div class="space-y-2 text-blue dark:text-gray-100">
        <label class="block mb-2 text-lg font-bold">Nom de l'entreprise&nbsp;:</label>
        <p>{{ user.companyName }}</p>
      </div>

      <div class="space-y-2 text-blue dark:text-gray-100">
        <label class="block mb-2 text-lg font-bold">N° Siret&nbsp;:</label>
        <p>{{ user.siret ? user.siret : ' -' }}</p>
      </div>

      <div v-if="isCurrentUserAdmin" class="space-y-2 text-blue dark:text-gray-100">
        <label class="block mb-2 text-lg font-bold">Roles&nbsp;:</label>
        <p>{{ user.roles }}</p>
      </div>

      <div class="space-y-2 text-blue dark:text-gray-100">
        <label class="block mb-2 text-lg font-bold">Abonnement&nbsp;:</label>
        <p>{{ getSuscriptionTranslation(user.subscription) }}</p>
      </div>
    </form>

    <div class="mt-12 text-black-light">
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
          <div v-else class="p-4 text-center text-gray-700 dark:text-gray-300">Aucun événement</div>
        </div>
      </div>

      <div v-if="activeTabs === 2" class="space-y-8">
        <EmployeeUserItem
          v-if="employeeByUserId.length"
          v-for="employee in employeeByUserId"
          :key="employee.id"
          :employee="employee"
        />
        <div
          v-else
          class="p-4 text-center text-gray-700 dark:text-gray-300"
        >Aucun destinataires nregistrés</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: number | null
}

const props = withDefaults(defineProps<Props>(), {
  id: null
})
const isLoading = ref(false)

const { getOne, isCurrentUserAdmin } = useUserStore()
const eventStore = useEventStore()
const employeeStore = useEmployeeStore()
const { getSuscriptionTranslation } = subscriptionHook()
const { fetchAllByUserId: fetchAllEmployeeByUserId } = employeeHook()
const { fetchEventsByUser } = eventHook()

const user = computed(() => props.id ? getOne(props.id) : null)

onMounted(async () => {
  isLoading.value = true
  const employeeIds = user.value?.employee as number[]
  const missingEmployeeIds = employeeIds.filter(id => !employeeStore.getOne(id))

  if (missingEmployeeIds.length > 0 && user.value) {
    await fetchAllEmployeeByUserId(user.value.id)
  }
  const eventIds = user.value?.events as number[]
  const missingEventIds = eventIds.filter(id => !eventStore.getOne(id))

  if (missingEventIds.length > 0 && user.value) {
    await fetchEventsByUser(user.value.id)
  }
  isLoading.value = false
})

const eventByUserId = computed(() => user.value ? eventStore.getMany(user.value.events as number[]) : [])

const employeeByUserId = computed(() => user.value ? employeeStore.getEmployeesByUserId(user.value.id) : [])

const activeTabs = ref(1)

const activeClasse = (tab: number) => computed(() => activeTabs.value === tab ? 'border-b-4 border-green-300' : '')

function toggleActiveTab(tab: number) {
  activeTabs.value = tab
}
</script>
