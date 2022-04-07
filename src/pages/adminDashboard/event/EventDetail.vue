<template>
  <div
    class="container relative min-h-screen py-6 pr-8 mx-auto text-left transition-all duration-500 ease-in-out transform"
  >
    <HeaderList>
      <template #title>
        <CalendarIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />
        {{ event.name }}
      </template>
    </HeaderList>
    <div class="shadow-lg rounded-b-md">
      <header class="py-8 rounded-t-lg bg-gray-50">
        <div
          class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between"
        >
          <div class="flex-1 min-w-0">
            <div class="flex items-center space-x-10">
              <h1
                class="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"
              >{{ event.name }}</h1>
              <EventStatusTag :status="event.status" />
            </div>
            <div class="flex flex-col mt-1 sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8">
              <div class="flex items-center mt-2 text-sm text-gray-500">
                <LocationMarkerIconOutline
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                {{ event.city }}
              </div>
              <div class="flex items-center mt-2 text-sm text-gray-500">
                <CalendarIconOutline
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Se termine le {{ toFormat(event.end, 'DD MMMM YYYY') }}
              </div>
            </div>
          </div>
          <div
            class="flex flex-col items-center justify-center mt-5 space-y-4 md:flex-row md:space-y-0 xl:mt-0 xl:ml-4"
          >
            <span class="relative z-0 sm:ml-3">
              <Listbox as="div" v-model="selected">
                <ListboxLabel class="sr-only">Change published status</ListboxLabel>
                <div class="relative">
                  <div class="inline-flex divide-x divide-purple-600 rounded-md shadow-sm">
                    <div
                      class="relative z-0 inline-flex divide-x divide-purple-600 rounded-md shadow-sm"
                    >
                      <div
                        class="relative inline-flex items-center py-2 pl-3 pr-4 text-white bg-purple-500 border border-transparent shadow-sm rounded-l-md"
                      >
                        <CheckIconOutline class="w-5 h-5" aria-hidden="true" />
                        <p class="ml-2.5 text-sm font-medium uppercase">{{ selected.name }}</p>
                      </div>
                      <ListboxButton
                        class="relative inline-flex items-center p-2 text-sm font-medium text-white bg-purple-500 rounded-l-none rounded-r-md hover:bg-purple-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
                      >
                        <span class="sr-only">Change published status</span>
                        <ChevronDownIconOutline class="w-5 h-5 text-white" aria-hidden="true" />
                      </ListboxButton>
                    </div>
                  </div>

                  <transition
                    leave-active-class="transition duration-100 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <ListboxOptions
                      class="absolute left-0 mt-2 -mr-1 overflow-hidden origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg w-72 ring-1 ring-black ring-opacity-5 focus:outline-none sm:left-auto sm:right-0"
                    >
                      <ListboxOption
                        as="template"
                        v-for="action in actions"
                        :key="action.name"
                        :value="action"
                        v-slot="{ active, selected }"
                      >
                        <li
                          :class="[active ? 'text-white bg-purple-500' : 'text-gray-900', 'cursor-default select-none relative p-4 text-sm flex items-center space-x-4 w-full']"
                        >
                          <component
                            :is="action.icon"
                            class="w-5 h-5 text-gray-500 dark:text-white-light"
                            aria-hidden="true"
                          />
                          <div class="flex flex-col">
                            <div class="flex justify-between">
                              <p
                                :class="selected ? 'font-semibold' : 'font-normal'"
                              >{{ action.name }}</p>
                              <span
                                v-if="selected"
                                :class="active ? 'text-white' : 'text-purple-500'"
                              >
                                <CheckIconOutline class="w-5 h-5" aria-hidden="true" />
                              </span>
                            </div>
                            <p
                              :class="[active ? 'text-purple-200' : 'text-gray-500', 'mt-2']"
                            >{{ action.description }}</p>
                          </div>
                        </li>
                      </ListboxOption>
                    </ListboxOptions>
                  </transition>
                </div>
              </Listbox>
            </span>
          </div>
        </div>
      </header>

      <main class="pt-8 pb-16 rounded-b-lg dark:bg-white">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="px-4 sm:px-0">
            <h2 class="text-lg font-medium text-gray-900">Destinataires</h2>

            <!-- Tabs -->
            <TabGroup>
              <TabList
                class="flex items-center mt-2 -mb-px space-x-8 border-b border-gray-200"
                aria-label="Tabs"
              >
                <Tab :disabled="employees.length === 0" v-slot="{ selected }">
                  <div
                    :class="[selected ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200', 'whitespace-nowrap py-4 px-1 border-b-2 font-medium',
                    { 'cursor-not-allowed opacity-50': employees.length === 0 }]"
                  >
                    <span>Inscrits</span>
                    <span
                      :class="[selected ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-900', 'hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block']"
                    >{{ employees.length }}</span>
                  </div>
                </Tab>
                <Tab :disabled="files.length === 0" v-slot="{ selected }">
                  <div
                    :class="[selected ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200', 'whitespace-nowrap py-4 px-1 border-b-2 font-medium',
                    { 'cursor-not-allowed opacity-50': files.length === 0 }]"
                  >
                    <span>Fichiers</span>
                    <span
                      :class="[selected ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-900', 'hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block']"
                    >{{ files.length }}</span>
                  </div>
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <ul
                    role="list"
                    class="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0"
                  >
                    <li v-for="employee in employees" :key="employee.id">
                      <a href="#" class="block group">
                        <div class="flex items-center px-4 py-5 sm:py-6 sm:px-0">
                          <div class="flex items-center flex-1 min-w-0">
                            <div class="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
                              <div>
                                <p class="text-sm font-medium text-purple-600 truncate">
                                  {{ employee.firstName }}
                                  {{ employee.lastName }}
                                </p>
                                <p class="flex items-center mt-2 text-sm text-gray-500">
                                  <MailIconOutline
                                    class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span class="truncate">{{ employee.email }}</span>
                                </p>
                              </div>
                              <div class="hidden md:block">
                                <div>
                                  <p class="text-sm text-gray-900">
                                    Applied on
                                    {{ ' ' }}
                                    <!-- <time
                                      :datetime="employee.appliedDatetime"
                                    >{{ employee.applied }}</time>-->
                                  </p>
                                  <p class="flex items-center mt-2 text-sm text-gray-500">
                                    <CheckCircleIconOutline
                                      class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                      aria-hidden="true"
                                    />
                                    <!-- {{ employee.status }} -->
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <button>
                              <!-- TODO add link to employee detail -->
                              <ChevronRightIconOutline
                                class="w-5 h-5 text-gray-400 group-hover:text-gray-700"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </TabPanel>
                <TabPanel>
                  <ul
                    role="list"
                    class="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0"
                  >
                    <li v-for="file in files" :key="file.id" class="block group">
                      <div class="flex items-center px-4 py-5 sm:py-6 sm:px-0">
                        <div class="flex items-center flex-1 min-w-0">
                          <div class="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
                            <div>
                              <p
                                class="text-sm font-medium text-purple-600 truncate"
                              >{{ file.name }}</p>
                              <p class="flex items-center mt-2 text-sm text-gray-500">
                                <InformationCircleIconOutline
                                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span class="truncate">{{ file.description }}</span>
                              </p>
                            </div>
                            <div class="hidden md:block">
                              <div>
                                <p class="text-sm text-gray-900">
                                  Créé le
                                  {{ ' ' }}
                                  <time
                                    :datetime="toFormat(file.createdAt, 'DD/MM/YYYY')"
                                  >{{ toFormat(file.createdAt, 'DD/MM/YYYY') }}</time>
                                </p>
                              </div>
                              <FileTypeTag :type="file.type" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <button>
                            <!-- TODO add link to file detail -->
                            <ChevronRightIconOutline
                              class="w-5 h-5 text-gray-400 group-hover:text-gray-700"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PencilIcon, TrashIcon } from '@heroicons/vue/outline'

const eventStore = useEventStore()
const { params } = useRoute()
const { toFormat } = dateHook()
const { getEmployeesByEventId } = employeeHook()
const { fetchAllForEvent } = fileHook()
const employeeStore = useEmployeeStore()
const fileStore = useFileStore()

const eventId = computed(() => parseInt(params.eventId as string))
const event = computed(() => eventStore.getOne(eventId.value))
const employees = computed(() => employeeStore.getAllByEventId(eventId.value))
const files = computed(() =>
  // fileStore.getWhereArray(file => file.event === eventId.value)
  fileStore.getAllArray
)

onMounted(async () => {
  if (eventId.value) {
    await getEmployeesByEventId(eventId.value)
    await fetchAllForEvent(eventId.value)
  }
})

const actions = [
  {
    name: 'Modifier',
    icon: PencilIcon,
    description: 'Modifier un l\'évenement',
  },
  {
    name: 'Supprimer',
    icon: TrashIcon,
    description: 'Supprimer un l\'évenement peut entrainer la perte de documents liés',
  },
]

const selected = ref(actions[0])
</script>
