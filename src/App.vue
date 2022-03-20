<template>
  <router-view v-slot="{ Component, route }">
    <component :is="Component" :key="route.path" class="min-h-screen bg-white dark:bg-blue-dark" />
  </router-view>
</template>
<script setup lang="ts">
import { useCookie } from 'vue-cookie-next'
import router from '@/router'

const store = useMainStore()
const userStore = useUserStore()
const { loginWithToken } = authHook()

onBeforeMount(async () => {
  const { getCookie } = useCookie()
  const token = getCookie('userToken')
  if (token && token.length > 0) {
    await loginWithToken(token)
    store.setIsLoggedIn()
    if (userStore.isCurrentUserAdmin) {
      router.push('/adminDashboard')
    } else {
      router.push('/userDashboard')
    }
  } else {
    router.push('/')
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
