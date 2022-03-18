<template>
  <BDrawer>
    <div class="flex flex-col font-semibold text-left justify">
      <h6 class="mb-4 font-bold text-gray-500">Menu</h6>
      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="p-1 mr-3 rounded-lg bg-red-light hover:bg-red">
          <HomeIconOutline class="h-6 text-white" />
        </div>
        <router-link to="/userDashboard" class="dark:text-white">Événements</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="p-1 mr-3 rounded-lg bg-red-light hover:bg-red">
          <UserGroupIconOutline class="h-6 text-white" />
        </div>
        <router-link to="/userDashboard/myEmployees" class="dark:text-white">Mes destinataires</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="p-1 mr-3 rounded-lg bg-red-light hover:bg-red">
          <FolderOpenIconOutline class="h-6 text-white" />
        </div>
        <router-link to="/userDashboard/MyFiles" class="dark:text-white">Mes Fichiers</router-link>
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

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="p-1 mr-3 rounded-lg bg-purple-light hover:bg-purple">
          <FolderAddIconOutline class="h-6 text-white" />
        </div>
        <router-link
          to="/userDashboard/CreateModel"
          class="dark:text-white"
        >Créer un nouveau fichier</router-link>
      </div>

      <h6 class="mb-4 font-bold text-gray-500">Options</h6>
      <div
        v-if="getCurrentUserId && getUserFullName"
        class="flex items-center w-full mb-5 cursor-pointer"
      >
        <div class="p-1 mr-3 rounded-lg bg-red-light hover:bg-red">
          <UserIconOutline class="h-6 text-white" />
        </div>
        <router-link to="/userDashboard/MyUserAccount" class="dark:text-white">{{ getUserFullName }}</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer" @click="onToggleLogout">
        <div class="p-1 mr-3 rounded-lg bg-purple-light hover:bg-purple">
          <LogoutIconOutline class="h-6 text-white" />
        </div>
        <router-link to="/">Se déconnecter</router-link>
      </div>
    </div>

    <BCard variant="danger">
      <div class="px-6 py-4">
        <div class="mb-2 text-xl font-bold">Découvrez notre abonnement</div>
        <p class="text-base text-gray-700">Dès 9.99€ par mois</p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <BButton class="text-black" size="small" variant="white">En savoir plus</BButton>
      </div>
    </BCard>
  </BDrawer>
</template>

<script setup lang="ts">
import { useCookie } from 'vue-cookie-next'
import { ModalModeEnum, ModalNameEnum } from '@/types/typesExported'
import { useUserStore, useUiStore } from '@/store'

interface Props {
  isActive?: boolean
}

withDefaults(defineProps<Props>(), {
  isActive: true,
})

const userStore = useUserStore()
const { getUserFullName, getCurrentUserId } = storeToRefs(userStore)
const { setUiModal } = useUiStore()

const { logout } = authHook()

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
