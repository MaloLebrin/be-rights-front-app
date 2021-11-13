<template>
  <span class="text-blue font-bold dark:text-white">Thème</span>
  <div
    class="w-14 h-8 bg-gray-300 rounded-full flex-shrink-0 p-1 cursor-pointer"
    :class="{ 'bg-blue': isDarkTheme}"
    @click="toggleTrue"
  >
    <div
      class="w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out"
      :class="isDarkTheme ? 'translate-x-6 bg-white' : 'bg-blue'"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import mainHook from '~/hooks/mainHook'
import useMainStore from '~/store/mainStore'

  const main = useMainStore()
  const { isDarkTheme } = storeToRefs(main)
  const { toggleThemeApp } = mainHook()

  function toggleTrue() {
    toggleThemeApp()
    isDarkTheme.value = !isDarkTheme.value
  }

</script>
