<template>
<div class="space-y-10">
  <!-- Page header -->
  <div
    v-if="user"
    class="max-w-3xl px-4 mx-auto sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8"
  >
    <div class="flex items-center space-x-5">
      <div class="flex-shrink-0">
        <UserAvatar
          :user="user"
          size="xl"
        />
      </div>
      <div>
        <h1
          class="text-2xl font-bold text-gray-900 dark:text-gray-200"
        >
          {{ user.firstName }} {{ user.lastName }}
        </h1>
        <p class="space-x-2 text-sm font-medium text-gray-500 dark:text-gray-300">
          <span>Créé le</span>
          <time
            class="text-gray-700 dark:text-gray-200"
            :datetime="toFormat(user.createdAt, 'D MMMM YYYY')"
          >
            {{ toFormat(user.createdAt, 'D MMMM YYYY') }}
          </time>
        </p>
      </div>
    </div>
    <div
      class="flex flex-col-reverse mt-6 space-y-4 space-y-reverse justify-stretch sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3"
    >
      <BaseButton @click="redirectToUserform">
        Modifier l'utilisateur
      </BaseButton>
    </div>
  </div>

  <div
    v-if="user"
    class="grid max-w-3xl grid-cols-1 gap-6 mx-auto mt-8 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-4"
  >
    <div class="space-y-6 lg:col-start-1 lg:col-span-2">
      <!-- Description-->
      <section aria-labelledby="user-informations">
        <div class="bg-white shadow sm:rounded-lg">
          <div class="flex items-center justify-between px-4 py-5 sm:px-6">
            <h2
              id="user-informations"
              class="text-lg font-medium leading-6 text-gray-900"
            >
              Détails de l'utilisateur
            </h2>
            <div class="flex items-center space-x-4">
              <UserRoleTag :role="user.roles" />
              <UserSubscriptionTag :subscription="user.subscription" />
            </div>
          </div>
          <div class="px-4 py-5 border-t border-gray-200 sm:px-6">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  Addresse Email
                </dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ user.email }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  N°siret
                </dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ user.siret }}
                </dd>
              </div>
              <div
                v-if="employees.length > 0"
                class="sm:col-span-2"
              >
                <dt class="text-sm font-medium text-gray-500">
                  Destinataires
                </dt>
                <dd class="mt-1 text-sm text-gray-900">
                  <ul
                    role="list"
                    class="border border-gray-200 divide-y divide-gray-200 rounded-md"
                  >
                    <li
                      v-if="employees.length"
                      class="px-4 py-2 text-sm text-gray-600"
                    >
                      Vous n'avez aucun destinataire
                    </li>
                    <li
                      v-for="employee in employees"
                      v-else
                      :key="employee.id"
                      class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                    >
                      <div class="flex items-center flex-1 w-0">
                        <UserCircleIconOutline
                          class="flex-shrink-0 w-5 h-5 text-gray-600 dark:text-gray-400"
                          aria-hidden="true"
                        />
                        <span class="flex-1 w-0 ml-2 truncate">
                          {{ employee.firstName }} {{
                            employee.lastName
                          }}
                        </span>
                      </div>
                      <div class="flex-shrink-0 ml-4">
                        <BaseButton @click="redirectToEmployeeDetail(employee.id)">
                          Voir
                        </BaseButton>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>

    <section
      aria-labelledby="timeline-title"
      class="lg:col-start-3 lg:col-span-2"
    >
      <div class="px-4 py-5 bg-white shadow sm:rounded-lg sm:px-6">
        <h2
          id="timeline-title"
          class="text-lg font-medium text-gray-900"
        >
          Événements
        </h2>

        <!-- Events Feed -->
        <div class="flow-root mt-6">
          <ul
            role="list"
            class="-mb-8"
          >
            <li
              v-if="events.length === 0"
              class="pb-8 text-sm text-gray-600"
            >
              Vous n'avez aucun Événements
            </li>
            <router-link
              v-for="(event, index) in events"
              v-else
              :key="event.id"
              :to="{ name: 'admin.events.show', params: { eventId: event.id } }"
            >
              <div class="relative pb-8">
                <span
                  v-if="events.length - 1 !== index"
                  class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
                <div class="relative flex items-center space-x-3">
                  <EventStatusTag :status="event.status" />
                  <div class="flex items-center justify-between flex-1 min-w-0 space-x-4">
                    <div>
                      <p
                        :to="{ name: 'admin.events.show', params: { eventId: event.id } }"
                        class="font-medium text-gray-900"
                      >
                        {{ event.name }}
                      </p>
                    </div>
                    <div
                      class="flex flex-col items-center text-sm text-right text-gray-500 whitespace-nowrap"
                    >
                      <div class="space-x-2">
                        <span class="font-medium">Du</span>
                        <time :datetime="toFormat(event.start, 'D.MM.YY')">
                          {{ toFormat(event.start, 'D.MM.YY') }}
                        </time>
                      </div>
                      <div class="space-x-2">
                        <span class="font-medium">Au</span>
                        <time :datetime="toFormat(event.end, 'D.MM.YY')">
                          {{ toFormat(event.end, 'D.MM.YY') }}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </ul>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<script setup lang="ts">
interface Props {
  id: number | null
}

const props = withDefaults(defineProps<Props>(), {
  id: null,
})

const router = useRouter()
const userStore = useUserStore()
const employeeStore = useEmployeeStore()
const eventStore = useEventStore()
const { IncLoading, DecLoading } = useUiStore()

const { fetchAllByUserId: fetchAllEmployeeByUserId } = employeeHook()
const { fetchEventsByUser, sortEventByDate } = eventHook()
const { fetchOne } = userHook()
const { toFormat } = dateHook()

const userId = computed(() => props.id)
const user = computed(() => props.id ? userStore.getOne(props.id) : null)

const employees = computed(() => employeeStore.getWhereArray(employee => employee.createdByUser === userId.value))
const events = computed(() => sortEventByDate(eventStore.getWhereArray(event => event.createdByUser === userId.value)))

onMounted(async() => {
  IncLoading()
  if (!user.value && userId.value) {
    await fetchOne(userId.value)
  }
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
  DecLoading()
})

function redirectToUserform() {
  if (userStore.isCurrentUserAdmin) {
    router.push({
      name: 'admin.users.edit',
      params: { userId: userId.value },
    })
  } else {
    router.push({
      name: 'user.account.edit',
      params: { userId: userId.value },
    })
  }
}

function redirectToEmployeeDetail(employeeId: number) {
  if (userStore.isCurrentUserAdmin) {
    router.push({
      name: 'admin.employees.details',
      params: { employeeId },
    })
  }
}
</script>
