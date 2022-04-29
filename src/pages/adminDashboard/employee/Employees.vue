<template>
<div
  class="relative min-h-screen px-4 py-6 text-left transition-all duration-500 ease-in-out transform"
>
  <div class="relative z-0 flex flex-1 overflow-hidden">
    <EmployeeDetails
      v-if="!state.isLoading && state.activeEmployee"
      :employee="state.activeEmployee"
    />
    <BaseLoader
      v-else
      class="mt-12"
    />

    <aside class="flex-shrink-0 hidden border-r border-gray-200 xl:order-first xl:flex xl:flex-col w-96">
      <div class="px-6 pt-6 pb-4">
        <h2 class="text-lg font-medium text-gray-900">
          {{ userStore.isCurrentUserAdmin ? 'Liste de vos destinataires' : 'Liste des destinataires' }}
        </h2>
        <p class="mt-1 text-sm text-gray-600">
          Search directory of 3,018 employees
        </p>
        <form
          class="flex mt-6 space-x-4"
          action="#"
        >
          <div class="flex-1 min-w-0">
            <label
              for="search"
              class="sr-only"
            >Recherche</label>
            <BaseInput
              v-model="state.search"
              type="text"
              placeholder="Recherchez"
              @keyup="searchEntity($event)"
            />
          </div>
        </form>
      </div>
      <!-- Employee list -->
      <nav
        class="flex-1 min-h-0 overflow-y-auto"
        aria-label="Employee"
      >
        <template v-if="employees.length > 0">
          <div
            v-for="letter in Object.keys(alphabeticalAmployeeList)"
            :key="letter"
            class="relative"
          >
            <div class="sticky top-0 z-10 px-6 py-1 text-sm font-medium text-gray-500 border-t border-b border-gray-200 bg-gray-50">
              <h3>{{ letter }}</h3>
            </div>
            <ul
              role="list"
              class="relative z-0 divide-y divide-gray-200"
            >
              <EmployeeItem
                v-for="employee in alphabeticalAmployeeList[letter]"
                :key="employee.id"
                :employee="employee"
                :class="{ 'bg-gray-100' : employee.id === state.activeEmployee.id }"
                @click="setActiveEmployee(employee)"
              />
            </ul>
          </div>
        </template>
        <p
          v-else
          class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 truncate whitespace-nowrap sm:pl-6"
        >
          {{ userStore.isCurrentUserAdmin ?
            'Aucun destinataire enregistré dans la base de donnée' :
            'Vous n\'avez pas de destinataire enregistré dans la base de donnée'
          }}
        </p>
      </nav>
    </aside>
  </div>
</div>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router'
import { alphabetical, uniq } from '@/utils/array'
import type { EmployeeType } from '@/types/typesExported'

const tableStore = useTableStore()
const { setFilters, setSearch } = useTableStore()
const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
const userStore = useUserStore()
const employeeStore = useEmployeeStore()

const { fetchAll } = employeeHook()
const { fetchMany } = userHook()
const { fetchLogoByUserId } = fileHook()

const employees = computed(() => alphabetical(employeeStore.getAllArray) as EmployeeType[])

const state = reactive({
  search: '',
  timeout: 0,
  isLoading: false,
  activeEmployee: employees.value[0] || null,
})

const alphabeticalAmployeeList = computed(() => {
  return employees.value.reduce((acc: Record<string, EmployeeType[]>, employee: EmployeeType) => {
    const letter = employee.lastName[0].toUpperCase()
    if (!acc[letter]) {
      acc[letter] = []
    }
    acc[letter].push(employee)
    return acc
  }, {})
})

onBeforeRouteLeave(() => {
  setFilters(null)
})

watch(() => tableStore.getFinalUrl, async newValue => {
  IncLoading()
  employeeStore.resetState()
  await fetchAll(newValue)
  DecLoading()
})

onMounted(async() => {
  IncLoading()
  state.isLoading = uiStore.getUIIsLoading
  await fetchAll(tableStore.getFinalUrl)
  if (employees.value.length > 0) {
    const userIds = employees.value.map(employee => employee.createdByUser) as number[]
    if (userIds.length > 0) {
      const uniqIds = uniq(userIds)
      const missingIds = uniqIds.filter(id => !userStore.getAllIds.includes(id))
      if (missingIds.length > 0) {
        await fetchMany(missingIds)
      }
      await Promise.all(uniqIds.map(id => fetchLogoByUserId(id)))
    }
  }
  DecLoading()
  state.isLoading = uiStore.getUIIsLoading
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function searchEntity(event: KeyboardEvent) {
  clearTimeout(state.timeout)
  state.timeout = window.setTimeout(() => {
    setSearch(state.search)
  }, 500)
}

function setActiveEmployee(employee: EmployeeType) {
  state.isLoading = true
  state.activeEmployee = employee
  state.isLoading = false
}
</script>
