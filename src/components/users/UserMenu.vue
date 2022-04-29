<template>
<Menu
  as="div"
  class="relative ml-3"
>
  <div>
    <MenuButton
      v-if="userStore.getCurrent"
      class="flex items-center flex-shrink-0 p-4"
    >
      <UserAvatar :user="userStore.getCurrent" />
      <div
        v-if="!isInHeader"
        class="ml-3"
      >
        <p class="text-sm font-medium text-gray-600 dark:text-white">
          {{ userStore.getUserFullName }}
        </p>
      </div>
    </MenuButton>
  </div>
  <transition
    enter-active-class="transition duration-100 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-75 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <MenuItems
      :class="['absolute w-48 py-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
               isInHeader ? 'origin-top-left -left-28' : 'origin-top-right -top-24']"
    >
      <MenuItem v-slot="{ active }">
        <router-link
          :to="{ name: userStore.isCurrentUserAdmin ? 'admin.users.show' : 'user.account', params: { userId: userStore.getCurrentUserId } }"
          :class="['flex items-center space-x-2 justify-start', active ? 'bg-gray-100' : '', 'px-4 py-2 text-sm text-gray-700']"
        >
          <UserCircleIconOutline class="h-6 text-gray-500" />
          <span>Voir le profile</span>
        </router-link>
      </MenuItem>

      <MenuButton v-if="!userStore.isCurrentUserAdmin">
        <div class="flex items-center justify-start w-full space-x-2 text-sm text-gray-700 cursor-pointer">
          <ExclamationCircleIconOutline class="h-6 text-gray-500" />
          <router-link :to="{ name: 'user.bug.create' }">
            Signaler un problème
          </router-link>
        </div>
      </MenuButton>
      <MenuButton>
        <div
          class="flex items-center justify-start w-full space-x-2 text-sm text-gray-700 cursor-pointer"
          @click="onToggleLogout"
        >
          <LogoutIconOutline class="h-6 text-gray-500" />
          <router-link :to="{ name: 'home' }">
            Se déconnecter
          </router-link>
        </div>
      </MenuButton>
    </MenuItems>
  </transition>
</Menu>
</template>

<script setup lang="ts">
import { useCookies } from 'vue3-cookies'

const userStore = useUserStore()
const { logout } = authHook()
const { cookies } = useCookies()

interface Props {
  isInHeader?: boolean
}

withDefaults(defineProps<Props>(), {
  isInHeader: false,
})

function onToggleLogout() {
  cookies.remove('userToken')
  logout()
}
</script>
