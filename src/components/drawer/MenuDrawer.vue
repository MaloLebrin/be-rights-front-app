<template>
  <BDrawer>
    <div class="flex flex-col font-semibold text-left justify">
      <h6 class="mb-4 font-bold text-gray-500">Menu</h6>
      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="p-1 mr-3 rounded-lg bg-red-light hover:bg-red">
          <HomeIconOutline class="h-6 text-white" />
        </div>
        <router-link :to="{ name: 'user.events' }" class="dark:text-white">Événements</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="p-1 mr-3 rounded-lg bg-red-light hover:bg-red">
          <UserGroupIconOutline class="h-6 text-white" />
        </div>
        <router-link :to="{ name: 'user.employees' }" class="dark:text-white">Mes destinataires</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="p-1 mr-3 rounded-lg bg-red-light hover:bg-red">
          <FolderOpenIconOutline class="h-6 text-white" />
        </div>
        <router-link :to="{ name: 'user.files' }" class="dark:text-white">Mes Fichiers</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="p-1 mr-3 rounded-lg bg-purple-light hover:bg-purple">
          <PlusIconOutline class="h-6 text-white" />
        </div>
        <router-link
          :to="{ name: 'user.events.create' }"
          class="dark:text-white"
        >Créer un nouvel événement</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="p-1 mr-3 rounded-lg bg-purple-light hover:bg-purple">
          <PlusIconOutline class="h-6 text-white" />
        </div>
        <router-link
          :to="{ name: 'user.employees.create' }"
          class="dark:text-white"
        >Créer un nouveau destinataire</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer">
        <div class="p-1 mr-3 rounded-lg bg-purple-light hover:bg-purple">
          <FolderAddIconOutline class="h-6 text-white" />
        </div>
        <router-link
          :to="{ name: 'user.files.create-model' }"
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
        <router-link :to="{ name: 'user.account' }" class="dark:text-white">{{ getUserFullName }}</router-link>
      </div>

      <div class="flex items-center w-full mb-5 cursor-pointer" @click="onToggleLogout">
        <div class="p-1 mr-3 rounded-lg bg-purple-light hover:bg-purple">
          <LogoutIconOutline class="h-6 text-white" />
        </div>
        <router-link :to="{ name: 'home' }">Se déconnecter</router-link>
      </div>
    </div>

    <div
      class="max-w-sm m-5 overflow-hidden text-black shadow-xl rounded-2xl bg-red hover:text-white hover:bg-red-light focus:ring-4 ring-red"
    >
      <div class="px-6 py-4">
        <div class="mb-2 text-xl font-bold">Découvrez notre abonnement</div>
        <p class="text-base text-gray-700">Dès 9.99€ par mois</p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <BaseButton color="white">En savoir plus</BaseButton>
      </div>
    </div>
  </BDrawer>
</template>

<script setup lang="ts">
import { useCookie } from 'vue-cookie-next'

interface Props {
  isActive?: boolean
}

withDefaults(defineProps<Props>(), {
  isActive: true,
})

const userStore = useUserStore()
const { getUserFullName, getCurrentUserId } = storeToRefs(userStore)

const { logout } = authHook()

const cookie = useCookie()

function onToggleLogout() {
  cookie.removeCookie('userToken')
  logout()
}
</script>
