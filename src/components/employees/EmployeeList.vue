<template>
<div class="relative z-0 flex flex-col flex-1 overflow-hidden md:flex-row">
  <EmployeeDetails
    v-if="!state.isLoading && state.activeEmployee"
    :employee="activeEmployee"
  />
  <BaseLoader
    v-else
    class="mt-12"
  />

  <aside class="order-first border-r border-gray-200 md:flex-shrink-0 xl:flex xl:flex-col w-96">
    <div class="px-6 pt-6 pb-4">
      <h2 class="text-lg font-medium text-gray-900">
        {{ userStore.isCurrentUserAdmin ? 'Liste de vos destinataires' : 'Liste des destinataires' }}
      </h2>
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
      class="flex-1 max-h-screen min-h-0 overflow-y-auto"
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
            <!-- TODO max height -->
            <EmployeeItem
              v-for="employee in alphabeticalAmployeeList[letter]"
              :key="employee.id"
              :employee="employee"
              :class="{ 'bg-gray-100' : employee.id === state.activeEmployee }"
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
</template>

<script setup lang="ts">
import { alphabetical } from '@/utils/array'
import type { EmployeeType } from '@/types'

const { setSearch } = useTableStore()
const userStore = useUserStore()
const employeeStore = useEmployeeStore()

const employees = computed(() => alphabetical(employeeStore.getAllArray) as EmployeeType[])

const state = reactive({
  search: '',
  timeout: 0,
  isLoading: false,
  activeEmployee: employees.value[0].id || null,
})

const activeEmployee = computed(() => {
  if (state.activeEmployee) {
    return employeeStore.getOne(state.activeEmployee)
  }
  return null
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function searchEntity(event: KeyboardEvent) {
  clearTimeout(state.timeout)
  state.timeout = window.setTimeout(() => {
    setSearch(state.search)
  }, 500)
}

function setActiveEmployee(employee: EmployeeType) {
  state.isLoading = true
  state.activeEmployee = employee.id
  state.isLoading = false
}
</script>
