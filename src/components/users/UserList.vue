<template>
  <div class="relative w-full h-full mt-40">
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
            v-if="user && user.events && eventByUserId(user.events).value.length"
            v-for="event in eventByUserId(user.events).value"
            :key="event.id"
            :event="event"
          />
          <div v-else class="p-4 text-center">Aucun événement</div>
        </div>

        <template #extraButton>
          <router-link
            :to="{ name: 'admin.users' }"
            class="EventActionButton"
            @click="redirectToUserForm(user.id)"
          >
            <div class="flex items-center">
              <EyeIconOutline class="w-4 h-4 mr-2 text-gray-800" />
              <span>Voir</span>
            </div>
          </router-link>
          <button
            v-if="userStore.getCurrent?.id !== user.id"
            class="EventActionButton"
            @click="onToggleUsersModal(user)"
          >
            <div class="flex items-center">
              <TrashIconOutline class="w-4 h-4 mr-2 text-red-800" />
              <span>Supprimer</span>
            </div>
          </button>
        </template>
      </DashboardItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalNameEnum, ModalModeEnum, SubscriptionEnum, UserType, EventType } from '@/types/typesExported'

interface Props {
  users: UserType[]
}

withDefaults(defineProps<Props>(), {
  users: () => [],
})

const { getDate } = dateHook()
const userStore = useUserStore()
const eventStore = useEventStore()
const uiStore = useUiStore()
const { setActive } = userStore
const { setUiModal } = uiStore

const eventByUserId = (ids: number[] | EventType[]) => computed(() => {
  if (typeof ids[0] === 'number') {
    return eventStore.getMany(ids as number[])
  }
  return ids as EventType[]
})

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