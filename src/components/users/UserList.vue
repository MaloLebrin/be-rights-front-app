<template>
  <Loader
    v-if="uiStore.getUIIsLoading"
    :isLoading="uiStore.getUIIsLoading"
    :type="LoaderTypeEnum.BOUNCE"
  />
  <div v-else class="relative w-full h-full mt-40">
    <div v-for="(user, index) in users" :key="user.id" class="relative flex items-center">
      <DashboardItem :index="parseInt(index.toString())">
        <template #title>
          <div
            class="flex items-center justify-between px-5 py-2 font-semibold text-black dark:text-white"
          >
            <div>{{ user.id }}</div>
            <span class="mx-3 bg-gray">{{ `${user.firstName} ${user.lastName}` }}</span>
            <span class="px-2 py-1 rounded-lg dark:bg-gray-500">{{ user.companyName }}</span>
            <span class="mx-3">{{ getSubscriptionTranslation(user.subscription) }}</span>
            <span>{{ getDate(user.createdAt.toString()) }}</span>
          </div>
        </template>

        <div class="mt-2 border-t-2 border-gray-200 dark:border-white-break">
          <EventUserItem
            v-if="eventByUserId(user.events).value.length"
            v-for="event in eventByUserId(user.events).value"
            :key="event.id"
            :event="event"
          />
          <div v-else class="p-4 text-center">Aucun événement</div>
        </div>

        <template #extraButton>
          <BLink
            tag="router-link"
            to="UserId"
            :variant="extraButtonStyle"
            class="EventActionButton"
            @click="redirectToUserForm(user.id)"
          >Voir</BLink>
          <BLink
            v-if="userStore.getCurrent?.id !== user.id"
            :variant="extraButtonStyle"
            class="EventActionButton"
            @click="onToggleUsersModal(user)"
          >Supprimer</BLink>
        </template>
      </DashboardItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LoaderTypeEnum } from '@/types/globals'
import { useEventStore, useMainStore, useUiStore, useUserStore } from '@/store'
import { dateHook } from '@/hooks'
import { ModalNameEnum, ModalModeEnum, SubscriptionEnum, UserType } from '@/store/typesExported'

interface Props {
  users: UserType[]
}

withDefaults(defineProps<Props>(), {
  users: () => [],
})

const { getDate } = dateHook()
const userStore = useUserStore()
const eventStore = useEventStore()
const mainStore = useMainStore()
const uiStore = useUiStore()
const { setActive } = userStore
const { setUiModal } = uiStore

const eventByUserId = (ids: number[]) => computed(() => eventStore.getMany(ids))
const extraButtonStyle = computed(() => mainStore.isDarkTheme ? 'primary' : "white")

function redirectToUserForm(userId: number) {
  setActive(userId)
}

function onToggleUsersModal(user: UserType) {
  setUiModal({
    isActive: true,
    modalName: ModalNameEnum.USER_ADMIN,
    modalMode: ModalModeEnum.DELETE,
    data: {
      user,
    }
  })
}

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
</script>