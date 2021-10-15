<template>
  <header
    class=" transform min-h-screen max-w-xs flex flex-col items-center px-2 py-4 bg-white w-96 duration-500 relative"
    :class="isDrawerActive ? 'translate-x-0' : '-translate-x-full'"
  >
    <ChevronLeftIcon
      v-if="isDrawerActive"
      class="text-gray-400 absolute top-2 -right-6 h-12 shadowl bg-white rounded-r-xl transform transition duration-500 hover:scale-125 cursor-pointer"
      @click="toggleDrawer"
    />
    <ChevronRightIcon
      v-else
      class="text-gray-400 absolute top-2 -right-12 h-12 shadowl bg-white rounded-r-xl transform transition duration-500 hover:scale-125 cursor-pointer"
      @click="toggleDrawer"
    />

    <nav class="w-full h-full">
      <div class="flex w-full items-center justify-center mb-10">
        <div class="rounded-full border-red border-4 w-10 h-10">
          <div class="rounded-full bg-red-light w-4 h-4 m-2" />
        </div>
        <h1 class="text-black font-bold text-3xl ml-2">Be right</h1>
      </div>

      <div class="flex flex-col justify h-full text-left">
        <h6 class="text-gray-500 font-bold mb-4">Menu</h6>
        <div class="flex items-center w-full mb-5 cursor-pointer">
          <div class="bg-red-light hover:bg-red rounded-lg mr-3 p-1">
            <HomeIcon class="text-white h-6" />
          </div>
          <span>Événements</span>
        </div>

        <div class="flex items-center w-full mb-5 cursor-pointer">
          <div class="bg-red-light hover:bg-red rounded-lg mr-3 p-1">
            <UserGroupIcon class="text-white h-6" />
          </div>
          <span>Clients</span>
        </div>

        <div class="flex items-center w-full mb-5 cursor-pointer">
          <div class="bg-red-light hover:bg-red rounded-lg mr-3 p-1">
            <DatabaseIcon class="text-white h-6" />
          </div>
          <span>Archives</span>
        </div>

        <div class="flex items-center w-full mb-5 cursor-pointer">
          <div class="bg-purple-light hover:bg-purple rounded-lg mr-3 p-1">
            <PlusIcon class="text-white h-6" />
          </div>
          <span>Créer un nouvel événement</span>
        </div>

        <h6 class="text-gray-500 font-bold mb-4">Options</h6>
        <div class="flex items-center w-full mb-5 cursor-pointer">
          <div class="bg-red-light hover:bg-red rounded-lg mr-3 p-1">
            <UserIcon class="text-white h-6" />
          </div>
          <span>{{ userFullName }}</span>
        </div>

        <div class="flex items-center w-full mb-5 cursor-pointer">
          <div class="bg-purple-light hover:bg-purple rounded-lg mr-3 p-1">
            <LogoutIcon class="text-white h-6" />
          </div>
          <span>Se déconnecter</span>
        </div>

      </div>
      <!-- TODO add CTA if suscrption basic -->

    </nav>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DatabaseIcon,
  HomeIcon,
  LogoutIcon,
  PlusIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/vue/outline'
import { useUserStore } from '@/store/users/userStore'

export default defineComponent({
  name: 'MenuDrawer',
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    DatabaseIcon,
    HomeIcon,
    LogoutIcon,
    PlusIcon,
    UserGroupIcon,
    UserIcon,
  },
  props: {
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const isDrawerActive = ref(props.isActive)
    const store = useUserStore()

    function toggleDrawer() {
      isDrawerActive.value = !isDrawerActive.value
      return emit('toggleDrawer', isDrawerActive.value)
    }

    const userFullName = computed(() => store.getUserFullName)

    return {
      isDrawerActive,
      toggleDrawer,
      userFullName,
    }
  },
})
</script>
