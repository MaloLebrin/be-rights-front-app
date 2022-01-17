<template>
  <BDrawer>
    <div class="flex flex-col font-semibold text-left justify">
      <h6 class="mb-4 font-bold text-gray-500">Menu</h6>
      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="p-1 mr-3 rounded-lg bg-red-light hover:bg-red">
          <HomeIconOutline class="h-6 text-white" />
        </div>
        <router-link to="/adminDashboard" class="dark:text-white">Événements</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="p-1 mr-3 rounded-lg bg-red-light hover:bg-red">
          <UserGroupIconOutline class="h-6 text-white" />
        </div>
        <router-link to="/adminDashboard/users" class="dark:text-white">Users</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="p-1 mr-3 rounded-lg bg-red-light hover:bg-red">
          <UsersIconOutline class="h-6 text-white" />
        </div>
        <router-link to="/adminDashboard/Employees" class="dark:text-white">Destinataires</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="p-1 mr-3 rounded-lg bg-red-light hover:bg-red">
          <FolderOpenIconOutline class="h-6 text-white" />
        </div>
        <router-link to="/adminDashboard/files" class="dark:text-white">Fichiers</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer" @click="toggleEventFormModal">
        <div class="p-1 mr-3 rounded-lg bg-purple-light hover:bg-purple">
          <PlusIconOutline class="h-6 text-white" />
        </div>
        <span class="dark:text-white">Créer un nouvel événement</span>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer" @click="toggleEmployeeFormModal">
        <div class="p-1 mr-3 rounded-lg bg-purple-light hover:bg-purple">
          <PlusIconOutline class="h-6 text-white" />
        </div>
        <span class="dark:text-white">Créer un nouveau destinataire</span>
      </div>

      <h6 class="mb-4 font-bold text-gray-500">Options</h6>
      <div v-if="store.getCurrent" class="flex items-center w-full mb-5 cursor-pointer">
        <div class="p-1 mr-3 rounded-lg bg-red-light hover:bg-red">
          <UserIconOutline class="h-6 text-white" />
        </div>
        <router-link to="/adminDashboard/myAccount" class="dark:text-white">{{ userFullName }}</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="p-1 mr-3 rounded-lg shadow-2xl bg-purple-light hover:bg-purple">
          <LogoutIconOutline class="h-6 text-white" />
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
