<template>
  <BDrawer>
    <div class="flex flex-col justify text-left font-semibold">
      <h6 class="text-gray-500 font-bold mb-4">Menu</h6>
      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="bg-red-light hover:bg-red rounded-lg mr-3 p-1">
          <HomeIconOutline class="text-white h-6" />
        </div>
        <router-link to="/userDashboard" class="dark:text-white">Événements</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="bg-red-light hover:bg-red rounded-lg mr-3 p-1">
          <UserGroupIconOutline class="text-white h-6" />
        </div>
        <router-link to="/userDashboard/myEmployees" class="dark:text-white">Mes destinataires</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="bg-red-light hover:bg-red rounded-lg mr-3 p-1">
          <DatabaseIconOutline class="text-white h-6" />
        </div>
        <span class="dark:text-white">Archives</span>
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
        <span class="dark:text-white">{{ userFullName }}</span>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer" @click="onToggleLogout">
        <div class="bg-purple-light hover:bg-purple rounded-lg mr-3 p-1">
          <LogoutIconOutline class="text-white h-6" />
        </div>
        <span>Se déconnecter</span>
      </div>
    </div>
    <!-- TODO add CTA if suscrption basic -->
    <!-- TODO abstract to library create modal custom comp -->
    <BCard variant="danger">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Découvrez notre abonnement</div>
        <p class="text-gray-700 text-base">Dès 9.99€ par mois</p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <BButton class="text-black" size="small" variant="white">En savoir plus</BButton>
      </div>
    </BCard>
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
  isActive: true,
})

const store = useUserStore()
const { setUiModal, setUIToast } = useUiStore()

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
