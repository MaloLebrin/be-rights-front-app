<template>
  <BDrawer>
    <div class="flex flex-col font-semibold text-left justify">
      <h6 class="mb-4 font-bold text-gray-500">Menu</h6>
      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="p-1 mr-3 rounded-lg bg-red-light hover:bg-red">
          <HomeIconOutline class="h-6 text-white" />
        </div>
        <router-link :to="{ name: 'admin.events' }" class="dark:text-white">Événements</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="p-1 mr-3 rounded-lg bg-red-light hover:bg-red">
          <UserGroupIconOutline class="h-6 text-white" />
        </div>
        <router-link :to="{ name: 'admin.users' }" class="dark:text-white">Users</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="p-1 mr-3 rounded-lg bg-red-light hover:bg-red">
          <UsersIconOutline class="h-6 text-white" />
        </div>
        <router-link :to="{ name: 'admin.employees' }" class="dark:text-white">Destinataires</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="p-1 mr-3 rounded-lg bg-red-light hover:bg-red">
          <FolderOpenIconOutline class="h-6 text-white" />
        </div>
        <router-link :to="{ name: 'admin.files' }" class="dark:text-white">Fichiers</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="p-1 mr-3 rounded-lg bg-red-light hover:bg-red">
          <ExclamationCircleIconOutline class="h-6 text-white" />
        </div>
        <router-link :to="{ name: 'admin.bugs' }" class="dark:text-white">Bugs et Problèmes</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="p-1 mr-3 rounded-lg bg-purple-light hover:bg-purple">
          <PlusIconOutline class="h-6 text-white" />
        </div>
        <router-link
          :to="{ name: 'admin.events.create' }"
          class="dark:text-white"
        >Créer un nouvel événement</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer" @click="toggleEmployeeFormModal">
        <div class="p-1 mr-3 rounded-lg bg-purple-light hover:bg-purple">
          <PlusIconOutline class="h-6 text-white" />
        </div>
        <span class="dark:text-white">Créer un nouveau destinataire</span>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer" @click="toggleFileFormModal">
        <div class="p-1 mr-3 rounded-lg bg-purple-light hover:bg-purple">
          <FolderAddIconOutline class="h-6 text-white" />
        </div>
        <span class="dark:text-white">Créer un nouveau fichier</span>
      </div>

      <h6 class="mb-4 font-bold text-gray-500">Options</h6>
      <div v-if="store.getCurrent" class="flex items-center w-full mb-5 space-x-2 cursor-pointer">
        <UserAvatar :user="store.getCurrent" size="sm" />
        <router-link :to="{ name: 'admin.account' }" class="dark:text-white">{{ userFullName }}</router-link>
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
import { useCookie } from 'vue-cookie-next'
import { ModalModeEnum, ModalNameEnum } from '@/types/typesExported'
//TODO refacto menu
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

function toggleEmployeeFormModal() {
  setUiModal({
    isActive: true,
    modalName: ModalNameEnum.ADD_EMPLOYEE,
    modalMode: ModalModeEnum.CREATE,
    data: {},
  })
}

function toggleFileFormModal() {
  setUiModal({
    isActive: true,
    modalName: ModalNameEnum.FILE_MODAL,
    modalMode: ModalModeEnum.CREATE,
    data: {},
  })
}
</script>
