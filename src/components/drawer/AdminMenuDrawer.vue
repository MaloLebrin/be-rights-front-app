<template>
  <BDrawer>
    <div class="flex flex-col justify text-left font-semibold">
      <h6 class="text-gray-500 font-bold mb-4">Menu</h6>
      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="bg-red-light hover:bg-red rounded-lg mr-3 p-1">
          <HomeIcon class="text-white h-6" />
        </div>
        <router-link to="/adminDashboard" class="dark:text-white">Événements</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="bg-red-light hover:bg-red rounded-lg mr-3 p-1">
          <UserGroupIcon class="text-white h-6" />
        </div>
        <router-link to="/adminDashboard/users" class="dark:text-white">Users</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="bg-red-light hover:bg-red rounded-lg mr-3 p-1">
          <DatabaseIcon class="text-white h-6" />
        </div>
        <span class="dark:text-white">Archives</span>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="bg-purple-light hover:bg-purple rounded-lg mr-3 p-1">
          <PlusIcon class="text-white h-6" />
        </div>
        <span class="dark:text-white">Créer un nouvel événement</span>
      </div>

      <h6 class="text-gray-500 font-bold mb-4">Options</h6>
      <div
        v-if="store.getCurrent"
        class="flex items-center w-full mb-5 cursor-pointer"
      >
        <div class="bg-red-light hover:bg-red rounded-lg mr-3 p-1">
          <UserIcon class="text-white h-6" />
        </div>
        <span class="dark:text-white">{{ userFullName }}</span>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="bg-purple-light hover:bg-purple rounded-lg mr-3 p-1 shadow-2xl">
          <LogoutIcon class="text-white h-6" />
        </div>
        <span
          class="dark:text-white"
          @click="onToggleLogout"
        >Se déconnecter</span>
      </div>

    </div>
  </BDrawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  DatabaseIcon,
  HomeIcon,
  LogoutIcon,
  PlusIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/vue/outline'
import { useUserStore }  from '@/store/index'
import { useCookie } from 'vue-cookie-next'
import authHook from '@/hooks/authHook'

interface Props {
  isActive?: boolean
}

withDefaults(defineProps<Props>(), {
  isActive: false,
})  
    const store = useUserStore()
    const { logout } = authHook()

    const userFullName = computed(() => store.getUserFullName)
    const cookie = useCookie()

    function onToggleLogout() {
      cookie.removeCookie('userToken')
      logout()
    }
</script>
