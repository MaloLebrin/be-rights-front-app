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

onMounted(async () => {
  const userStore = useUserStore()
  const { getUserWithTokenFromAPI } = userStore
  const authStore = useAuthStore()
  const { setJWTasUser } = authStore
  const { jwtDecode, setUserLogged } = authHook()
  const { cookies } = useCookies()

  const token = cookies.get('userToken')
  if (token) {
    console.log(token, '<==== token')
    const decoded = jwtDecode(token)
    if (decoded) {
      console.log(decoded, '<==== decoded')
      setUserLogged(decoded)
      setJWTasUser(decoded)
      console.log(authStore.$state, '<==== authStore')
    }
    await getUserWithTokenFromAPI(token)
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
