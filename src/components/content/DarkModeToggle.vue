<template>
  <span class="font-bold text-blue dark:text-white">Thème</span>
  <div
    class="flex-shrink-0 h-8 p-1 bg-gray-300 rounded-full cursor-pointer w-14"
    :class="{ 'bg-blue': isDarkTheme }"
    @click="toggleTrue"
  >
    <div
      class="w-6 h-6 duration-300 ease-in-out transform rounded-full shadow-md"
      :class="isDarkTheme ? 'translate-x-6 bg-white' : 'bg-blue'"
    ></div>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/mainStore'
import { ThemeEnum } from '@/types'

const main = useMainStore()
const { isDarkTheme, theme } = storeToRefs(main)
const { toggleTheme } = mainHook()
const { userToggleTheme } = userHook()

async function toggleTrue() {
  toggleTheme()
  isDarkTheme.value = !isDarkTheme.value
  theme.value = isDarkTheme.value ? ThemeEnum.DARK : ThemeEnum.LIGHT
  await userToggleTheme(theme.value)
}

</script>
