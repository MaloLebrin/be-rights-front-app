<template>
  <header
    class="min-h-screen top-0 left-0 flex flex-col items-center px-2 py-4 bg-white dark:bg-blue-dark_bold w-96 max-w-96 shadow-2xl relative DarkModeAnimation"
    :class="isDrawerActive ? 'translate-x-0' : '-translate-x-full'"
  >
    <ChevronLeftIcon
      v-if="isDrawerActive"
      class="text-gray-400 absolute top-2 -right-6 h-12 shadowl bg-white dark:bg-blue-dark_bold dark:text-white rounded-r-xl transform transition duration-500 hover:scale-125 cursor-pointer z-30"
      @click="toggleDrawer"
    />
    <ChevronRightIcon
      v-else
      class="text-gray-400 absolute top-2 -right-12 h-12 shadowl bg-white dark:bg-blue-dark_bold dark:text-white rounded-r-xl transform transition duration-500 hover:scale-125 cursor-pointer z-30"
      @click="toggleDrawer"
    />
    <!-- https://codepen.io/boussadjra/pen/ExgzKyj link exemple to close and open drawer -->
    <nav class="w-full h-full">
      <SimpleLogo class="mb-10" />

      <slot />
    </nav>
    <DarkModeToggle />
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/outline'
import DarkModeToggleVue from '@/components/content/darkModeToggle.vue'

export default defineComponent({
  name: 'BDrawer',
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    DarkModeToggleVue,
  },

  props: {
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const isDrawerActive = ref(props.isActive)

    function toggleDrawer() {
      isDrawerActive.value = !isDrawerActive.value
      return emit('toggleDrawer', isDrawerActive.value)
    }

    return {
      isDrawerActive,
      toggleDrawer,
    }
  },
})
</script>
