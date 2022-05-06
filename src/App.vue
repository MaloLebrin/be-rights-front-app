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

const mainStore = useMainStore()
const { setCookiesAccepted } = useMainStore()
const { loginWithToken } = authHook()

onBeforeMount(async() => {
  const { cookies } = useCookies()
  const cookiesAccepted = cookies.get('areCookiesAccepted')
  if (cookiesAccepted) {
    setCookiesAccepted()
  }
  if (!mainStore.getIsLoggedIn) {
    const token = cookies.get('userToken')
    if (token && token.length > 0) {
      await loginWithToken(token)
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
