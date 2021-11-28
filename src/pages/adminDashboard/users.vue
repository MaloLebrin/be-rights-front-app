<template>
<div class="bg-white-light dark:bg-blue-dark min-h-screen transform ease-in-out transition-all duration-500 py-6 text-left pl-14 pr-8">
	<HeaderList class="sticky"/>

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
    :index="parseInt(index.toString())"
    @updateOneItem="testEvent"
    @addOne="testEvent"
    @deleteOne="testEvent"
    @download="testEvent"
  >
    <template #title>
      <div class="flex items-center justify-between px-5 py-2 font-semibold text-black dark:text-white">
        <div>{{ user.id }}</div>
        <span class="bg-gray mx-3">{{ `${user.firstName} ${user.lastName}` }}</span>
        <span v-if="user.companyName" class="dark:bg-gray-500 px-2 py-1 rounded-lg">{{ user.companyName}}</span>
        <span class="mx-3">{{ user.subscription }}</span>
        <span>{{ getDate(new Date(user.createdAt)) }}</span>
      </div>
    </template>

    <div class="mt-2">
      <EventUserItem
        v-if="eventByUserId(user.id).value.length"
        v-for="event in eventByUserId(user.id).value"
        :key="event.id"
        :event="event"
      />
      <span v-else class="ml-4">Aucun événement</span>
    </div>
  </DashboardItem>

  </div>
</div>
</template>
<route>
{meta: {
  layout: "AdminDashboardLayout",
}
}
</route>

<script setup lang="ts">
import { LoaderTypeEnum } from '@/types/globals'
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useEventStore, useUserStore } from '@/store'
import { dateHook, userHook } from '@/hooks'

const isLoading = ref(false)
const { getDate } = dateHook()
const { fetchAll } = userHook()
const userStore = useUserStore()
const { getAll } = storeToRefs(userStore)
const eventStore = useEventStore()
const { getAll: getAllEvents } = storeToRefs(eventStore)
const users = computed(() => getAll.value)

const eventByUserId = (id: number) => computed(() => Object.values(getAllEvents.value).filter(event => event.createdByUser === id))
onMounted(async() => {
  isLoading.value = true
  await fetchAll()
  isLoading.value = false
  console.log(getAllEvents.value, 'getAllEvents.value')
})

function testEvent(event: any) {
  console.log(event)
}
</script>