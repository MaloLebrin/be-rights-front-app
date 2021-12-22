<template>
  <router-view v-slot="{ Component, route }">
    <component :is="Component" :key="route.path" class="bg-white dark:bg-blue-dark min-h-screen" />
  </router-view>
</template>
<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { authHook } from './hooks'
import { useMainStore } from './store'
import { useCookie } from 'vue-cookie-next'
import router from '@/router'
import { RoleEnum } from './types'

const store = useMainStore()
const { loginWithToken } = authHook()

onBeforeMount(async () => {
  const { getCookie } = useCookie()
  const token = getCookie('userToken')
  if (token && token.length > 0) {
    const user = await loginWithToken(token)
    store.setIsLoggedIn()
    if (user && user.roles === RoleEnum.ADMIN) {
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
