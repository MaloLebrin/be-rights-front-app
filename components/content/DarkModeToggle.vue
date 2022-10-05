<template>
<SwitchGroup>
  <div class="flex items-center justify-center space-x-4">
    <SwitchLabel class="text-gray-600 dark:text-white-break">
      {{ main.isDarkTheme ? 'Clair' : 'Sombre' }}
    </SwitchLabel>
    <Switch
      v-model="isAppDarkTheme"
      :class="main.isDarkTheme ? 'bg-blue-600 focus:ring-gray-500' : 'bg-gray-200 focus:ring-blue-600'"
      class="relative inline-flex items-center h-6 transition-colors rounded-full w-11 focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      <span
        class="inline-block w-4 h-4 transition duration-500 ease-in-out transform bg-white rounded-full"
        :class="[main.isDarkTheme ? 'translate-x-6 bg-gray-200' : 'translate-x-1 bg-blue-600']"
      />
    </Switch>
  </div>
</SwitchGroup>
</template>

<script setup lang="ts">
import { ThemeEnum } from '@/types'
import { useMainStore } from '~~/store/main'

const main = useMainStore()
const { setTheme } = main
const { toggleTheme } = mainHook()
const { userToggleTheme } = userHook()

async function toggleAppTheme() {
  await toggleTheme()
  setTheme(main.isDarkTheme ? ThemeEnum.DARK : ThemeEnum.LIGHT)
  await userToggleTheme(main.theme)
}

const isAppDarkTheme = ref(main.isDarkTheme)
watch(() => isAppDarkTheme.value, async newValue => {
  await toggleAppTheme()
  isAppDarkTheme.value = newValue
})
</script>
