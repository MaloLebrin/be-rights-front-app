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
import { isTruthy } from '@antfu/utils'

onMounted(async () => {
  const userStore = useUserStore()
  const { getUserWithTokenFromAPI } = userStore
  const authStore = useAuthStore()
  const { setJWTasUser } = authStore
  const { jwtDecode, setUserLogged } = authHook()
  const { cookies } = useCookies()

  const token = cookies.get('userToken')
  if (token) {
    const decoded = jwtDecode(token)
    if (decoded) {
      setUserLogged(decoded)
      setJWTasUser(decoded)
    }
    const isUserAlreadyInStore = userStore.getWhere(user => user.token === token)
    if (!isTruthy(userStore.getCurrent) || userStore.getIsEmpty || !isTruthy(isUserAlreadyInStore)) {
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
