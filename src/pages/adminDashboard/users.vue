<template>
  <div
    class="min-h-screen py-6 pr-8 text-left transition-all duration-500 ease-in-out transform pl-14"
  >
    <HeaderList>
      <template #title>
        <UserGroupIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />Utilisateurs
      </template>
    </HeaderList>

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
              :variant="extraButtonStyle"
              class="EventActionButton"
              @click="onToggleUsersModal(ModalModeEnum.UPDATE, user)"
            >Voir</BLink>
            <BLink
              v-if="getCurrent?.id !== user.id"
              :variant="extraButtonStyle"
              class="EventActionButton"
              @click="onToggleUsersModal(ModalModeEnum.DELETE, user)"
            >Supprimer</BLink>
          </template>
        </DashboardItem>
      </div>
      <!-- TODO refacto vif -->
      <UsersAdminModal
        v-if="getUiModalState.isActive && getUiModalState.modalName === ModalNameEnum.USER_ADMIN && getUiModalState.data"
        :isActive="getUiModalState.isActive"
        :mode="getUiModalState.modalMode"
        :user="getUiModalState.data.user"
        @close="resetModal"
      />
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
import { useEventStore, useMainStore, useUiStore, useUserStore } from '@/store'
import { dateHook, userHook } from '@/hooks'
import { ModalNameEnum, ModalModeEnum, SubscriptionEnum, UserType } from '@/store/typesExported'

const userStore = useUserStore()
const eventStore = useEventStore()
const mainStore = useMainStore()
const uiStore = useUiStore()
const { getUiModalState, resetUIState, setUiModal, IncLoading, DecLoading } = uiStore

const { getDate } = dateHook()
const { fetchAll } = userHook()

const { isDarkTheme } = mainStore

const { getAll, getCurrent } = storeToRefs(userStore)
const users = computed(() => getAll.value)

const eventByUserId = (ids: number[]) => computed(() => eventStore.getMany(ids))

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

onMounted(async () => {
  IncLoading()
  await fetchAll()
  DecLoading()
})

const extraButtonStyle = computed(() => isDarkTheme ? 'primary' : "white")

function onToggleUsersModal(type: ModalModeEnum, user: UserType) {
  setUiModal({
    isActive: true,
    modalName: ModalNameEnum.USER_ADMIN,
    modalMode: type,
    data: {
      user,
    }
  })

}

function resetModal() {
  resetUIState()
}
</script>