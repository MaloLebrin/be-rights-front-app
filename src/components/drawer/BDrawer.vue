<template>
  <header
    class="navbar min-h-screen top-0 left-0 flex flex-col items-center px-2 py-4 bg-white dark:bg-blue-dark_bold max-w-96 shadow-2xl relative DarkModeAnimation z-50"
    :class="isDrawerActive ? 'navbar-open w-96' : 'navbar-close w-0 px-0 py-0'"
  >
    <ChevronLeftIcon
      v-if="isDrawerActive"
      class="text-gray-400 absolute top-2 -right-6 h-12 shadowl bg-white dark:bg-blue-dark_bold dark:text-white rounded-r-xl transform transition duration-500 hover:scale-125 cursor-pointer z-30"
      @click="toggleDrawer"
    />
    <ChevronRightIcon
      v-else
      class="text-gray-400 absolute top-2 -right-12 h-12 shadow-2xl bg-white dark:bg-blue-dark_bold dark:text-white rounded-r-xl transform transition duration-500 hover:scale-125 cursor-pointer z-30"
      @click="toggleDrawer"
    />
    <!-- https://codepen.io/boussadjra/pen/ExgzKyj link exemple to close and open drawer -->
    <nav
      v-if="isDrawerActive"
      class="w-full h-full sticky"
    >
      <SimpleLogo class="mb-10" />

      <slot />
    </nav>
    <DarkModeToggle v-if="isDrawerActive" />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/outline'
import DarkModeToggleVue from '@/components/content/darkModeToggle.vue'

interface Props {
    isActive?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
    isActive: true,
})  
const isDrawerActive = ref<boolean>(props.isActive)

const emit = defineEmits<{
    (e: 'toggleDrawer', value: boolean): boolean
}>()


function toggleDrawer() {
  isDrawerActive.value = !isDrawerActive.value
  return emit('toggleDrawer', isDrawerActive.value)
}

</script>
<style>
.navbar {
  transition: all 330ms ease-out;
}

.navbar-open {
  transform: translateX(0%);
}
.navbar-close {
  transform: translateX(-100%);
}
</style>