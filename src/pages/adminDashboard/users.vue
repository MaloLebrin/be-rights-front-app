<template>
<div class="bg-white-light dark:bg-blue-dark min-h-screen transform ease-in-out transition-all duration-500 py-6 text-left pl-14 pr-8">
	<HeaderList />

  <Loader
    v-if="isLoading"
    :isLoading="isLoading"
    :type="LoaderTypeEnum.BOUNCE"
  />

  <div
    v-else
    v-for="(user, index) in users"
    :key="user.id"
    class="flex items-center"
  >
  <DashboardItem
    :index="index"
    @updateOneItem="testEvent"
    @addOne="testEvent"
    @deleteOne="testEvent"
    @download="testEvent"
  >
    <template #title>
      <div class="flex items-center justify-between px-5 py-2 font-semibold text-black dark:text-white">
        <div>{{ user.id }}</div>
        <span class="bg-gray mx-3">{{ `${user.firstName} ${user.lastName}` }}</span>
        <span class="dark:bg-gray-500 px-2 py-1 rounded-lg">{{ user.companyName}}</span>
        <span class="mx-3">{{ user.subscription }}</span>
        <span>{{ getDate(new Date(user.createdAt)) }}</span>
      </div>
    </template>

    <div class="mt-2">
      {{user}}
      <!-- <EmployeeEventItem
        v-if="employees.length > 0"
        v-for="employee in employees"
        :key="employee.id"
        :employee="employee"
      />
      <span v-else>Aucun employé</span> -->
    </div>
  </DashboardItem>

  </div>
</div>
</template>
<route>
{meta: {
  layout: "AdminDashboardLayout",
  middleware: ["users"]
}
}
</route>

<script setup lang="ts">
import { LoaderTypeEnum } from '@/types/globals'
import { computed, onMounted, ref } from 'vue'
import userHook from '@/hooks/userHook'
import dateHook from '@/hooks/dateHook'
import useUserStore from '@/store/users/userStore'
import { storeToRefs } from 'pinia'

const isLoading = ref(false)
const { getDate } = dateHook()
const { fetchAll } = userHook()
const userStore = useUserStore()
const { getAll } = storeToRefs(userStore)
const users = computed(() => getAll.value)

onMounted(async() => {
  isLoading.value = true
  await fetchAll()
  isLoading.value = false
})

function testEvent(event: any) {
  console.log(event)
}
</script>