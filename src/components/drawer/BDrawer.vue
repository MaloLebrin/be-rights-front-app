<template>
  <header
    class=" transform min-h-screen top-0 left-0 flex flex-col items-center px-2 py-4 ease-in-out transition-all bg-white w-96 max-w-96 duration-500 shadow-2xl relative"
    :class="isDrawerActive ? 'translate-x-0' : '-translate-x-full'"
  >
    <ChevronLeftIcon
      v-if="isDrawerActive"
      class="text-gray-400 absolute top-2 -right-6 h-12 shadowl bg-white rounded-r-xl transform transition duration-500 hover:scale-125 cursor-pointer z-30"
      @click="toggleDrawer"
    />
    <ChevronRightIcon
      v-else
      class="text-gray-400 absolute top-2 -right-12 h-12 shadowl bg-white rounded-r-xl transform transition duration-500 hover:scale-125 cursor-pointer z-30"
      @click="toggleDrawer"
    />

    <nav class="w-full h-full">
      <SimpleLogo />

      <slot />
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/outline'

export default defineComponent({
  name: 'BDrawer',
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
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
