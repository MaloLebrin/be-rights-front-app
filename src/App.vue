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
import { useCookie } from 'vue-cookie-next'
const router = useRouter()

const { setIsLoggedIn, setCookiesAccepted } = useMainStore()
const userStore = useUserStore()
const { loginWithToken } = authHook()

onBeforeMount(async() => {
  const { getCookie } = useCookie()
  const cookiesAccepted = getCookie('areCookiesAccepted')
  if (cookiesAccepted) {
    setCookiesAccepted()
  }
  const token = getCookie('userToken')
  if (token && token.length > 0) {
    await loginWithToken(token)
    setIsLoggedIn()
    if (userStore.isCurrentUserAdmin) {
      router.push({ name: 'admin.events' })
    } else {
      router.push({ name: 'user.events' })
    }
  } else {
    router.push({ name: 'login' })
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
  display: flex;
  justify-content: center;
  flex: 1;
}
</style>
