<template>
  <BDrawer>
    <div class="flex flex-col justify text-left font-semibold">
      <h6 class="text-gray-500 font-bold mb-4">Menu</h6>
      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="bg-red-light hover:bg-red rounded-lg mr-3 p-1">
          <HomeIconOutline class="text-white h-6" />
        </div>
        <router-link to="/adminDashboard" class="dark:text-white">Événements</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="bg-red-light hover:bg-red rounded-lg mr-3 p-1">
          <UserGroupIconOutline class="text-white h-6" />
        </div>
        <router-link to="/adminDashboard/users" class="dark:text-white">Users</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer" @click="toggleEventFormModal">
        <div class="bg-purple-light hover:bg-purple rounded-lg mr-3 p-1">
          <PlusIconOutline class="text-white h-6" />
        </div>
        <span class="dark:text-white">Créer un nouvel événement</span>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer" @click="toggleEmployeeFormModal">
        <div class="bg-purple-light hover:bg-purple rounded-lg mr-3 p-1">
          <PlusIconOutline class="text-white h-6" />
        </div>
        <span class="dark:text-white">Créer un nouveau destinataire</span>
      </div>

      <h6 class="text-gray-500 font-bold mb-4">Options</h6>
      <div v-if="store.getCurrent" class="flex items-center w-full mb-5 cursor-pointer">
        <div class="bg-red-light hover:bg-red rounded-lg mr-3 p-1">
          <UserIconOutline class="text-white h-6" />
        </div>
        <router-link to="/adminDashboard/myAccount" class="dark:text-white">{{ userFullName }}</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="bg-purple-light hover:bg-purple rounded-lg mr-3 p-1 shadow-2xl">
          <LogoutIconOutline class="text-white h-6" />
        </div>
        <span class="dark:text-white" @click="onToggleLogout">Se déconnecter</span>
      </div>
    </div>
  </BDrawer>
</template>

<script setup lang="ts">
import { useUserStore, useUiStore } from '@/store/index'
import { useCookie } from 'vue-cookie-next'
import { authHook } from '@/hooks'
import { ModalModeEnum, ModalNameEnum } from '@/store/typesExported'

interface Props {
  isActive?: boolean
}

withDefaults(defineProps<Props>(), {
  isActive: false,
})
const store = useUserStore()
const uiStore = useUiStore()
const { setUiModal } = uiStore
const { logout } = authHook()

const userFullName = computed(() => store.getUserFullName)
const cookie = useCookie()

function onToggleLogout() {
  cookie.removeCookie('userToken')
  logout()
}

function toggleEventFormModal() {
  setUiModal({
    isActive: true,
    modalName: ModalNameEnum.EVENT_FORM,
    modalMode: ModalModeEnum.CREATE,
    data: {},
  })
}

function toggleEmployeeFormModal() {
  setUiModal({
    isActive: true,
    modalName: ModalNameEnum.ADD_EMPLOYEE,
    modalMode: ModalModeEnum.CREATE,
    data: {},
  })
}
</script>
