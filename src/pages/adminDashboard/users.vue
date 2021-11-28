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
        <span class="dark:bg-gray-500 px-2 py-1 rounded-lg">{{ user.companyName}}</span>
        <span class="mx-3">{{ getSubscriptionTranslation(user.subscription) }}</span>
        <span>{{ getDate(new Date(user.createdAt.toString())) }}</span>
      </div>
    </template>

    <div class="mt-2 border-t-2 border-gray-200 dark:border-white-break">
      <EventUserItem
        v-if="eventByUserId(user.id).value.length"
        v-for="event in eventByUserId(user.id).value"
        :key="event.id"
        :event="event"
      />
      <span v-else class="ml-4">Aucun événement</span>
    </div>

    <template #extraButton>
      <BLink :variant="extraButtonStyle" class="EventActionButton">modifier</BLink>
      <BLink :variant="extraButtonStyle" class="EventActionButton">Supprimer</BLink>
      <BLink :variant="extraButtonStyle" class="EventActionButton">Voir</BLink>
    </template>

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
import { useEventStore, useMainStore, useUserStore } from '@/store'
import { dateHook, userHook } from '@/hooks'
import { SubscriptionEnum } from '@/store/typesExported'

const userStore = useUserStore()
const eventStore = useEventStore()
const mainStore = useMainStore()
const { getDate } = dateHook()
const { fetchAll } = userHook()

const { isDarkTheme } = mainStore
const isLoading = ref(false)
const { getAll } = storeToRefs(userStore)
const { getAll: getAllEvents } = storeToRefs(eventStore)
const users = computed(() => getAll.value)

const eventByUserId = (id: number) => computed(() => Object.values(getAllEvents.value).filter(event => event.createdByUser === id))

function getSubscriptionTranslation(subscription: SubscriptionEnum) {
  switch (subscription) {
    case SubscriptionEnum.BASIC:
      return 'Basic'
    case SubscriptionEnum.MEDIUM:
      return 'Pro'
    case SubscriptionEnum.PREMIUM:
      return 'Premium'
    
    default:
      return 'Gratuit'
  }
}

onMounted(async() => {
  isLoading.value = true
  await fetchAll()
  isLoading.value = false
})

const extraButtonStyle = computed(() => isDarkTheme ? 'primary' : "white")

</script>