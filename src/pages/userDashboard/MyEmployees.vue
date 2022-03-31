<template>
  <div
    class="relative min-h-screen py-6 pr-8 text-left transition-all duration-500 ease-in-out transform dark:bg-blue-dark pl-14"
  >
    <HeaderList>
      <template #title>
        <UserGroupIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />Mes destinataires
      </template>
    </HeaderList>
    <EmployeeList :employees="employees" />
  </div>
</template>

<script setup lang="ts">
const { IncLoading, DecLoading } = useUiStore()
const userStore = useUserStore()

const { getWhereArray: getWhereArrayEmployees } = useEmployeeStore()
const { fetchAllByUserId } = employeeHook()

const employees = computed(() =>
  getWhereArrayEmployees(employee => employee.createdByUser === userStore.getCurrentUserId)
)

onMounted(async () => {
  if (userStore.getCurrentUserId) {
    IncLoading()
    await fetchAllByUserId(userStore.getCurrentUserId)
    DecLoading()
    console.log(employees.value, 'employees.value')
  }
})
</script>

<!-- <route>
{
  meta: {
    layout: "DashboardLayout",
    isAuth: true,
  }
}
</route> -->
