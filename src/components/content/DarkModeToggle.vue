<template>
<SwitchGroup>
  <div class="flex items-center justify-center space-x-4">
    <SwitchLabel class="text-gray-600 dark:text-white-break">
      {{ isDarkTheme ? 'Clair' : 'Sombre' }}
    </SwitchLabel>
    <Switch
      v-model="isAppDarkTheme"
      :class="isDarkTheme ? 'bg-blue-600 focus:ring-gray-500' : 'bg-gray-200 focus:ring-blue-600'"
      class="relative inline-flex items-center h-6 transition-colors rounded-full w-11 focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      <span
        class="inline-block w-4 h-4 transition duration-500 ease-in-out transform bg-white rounded-full"
        :class="[isDarkTheme ? 'translate-x-6 bg-gray-200' : 'translate-x-1 bg-blue-600']"
      />
    </Switch>
  </div>
</SwitchGroup>
</template>

<script setup lang="ts">
import { ThemeEnum } from '@/types'

const main = useMainStore()
const { isDarkTheme, theme } = storeToRefs(main)
const { toggleTheme } = mainHook()
const { userToggleTheme } = userHook()

async function toggleAppTheme() {
  await toggleTheme()
  theme.value = isDarkTheme.value ? ThemeEnum.DARK : ThemeEnum.LIGHT
  await userToggleTheme(theme.value)
}

const isAppDarkTheme = ref(isDarkTheme.value)
watch(() => isAppDarkTheme.value, async newValue => {
  await toggleAppTheme()
  isAppDarkTheme.value = newValue
})
</script>
