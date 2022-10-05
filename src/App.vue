<template>
<router-view v-slot="{ Component, route }">
  <component
    :is="Component"
    :key="route.path"
    class="min-h-screen bg-white dark:bg-blue-dark"
  />
</router-view>
</template>

<script setup lang="ts">
import { useCookies } from 'vue3-cookies'

onBeforeMount(async () => {
  const userStore = useUserStore()
  const { getUserWithTokenFromAPI } = userStore
  const { cookies } = useCookies()

  if (!userStore.getCurrent) {
    const token = cookies.get('userToken')
    if (token) {
      await getUserWithTokenFromAPI(token)
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
