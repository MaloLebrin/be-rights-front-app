<template>
  <router-view v-slot="{ Component, route }">
    <component :is="Component" :key="route.path" class="bg-white dark:bg-blue-dark min-h-screen" />
  </router-view>
</template>
<script setup lang="ts">
import { watch, onBeforeMount } from 'vue'
import { authHook } from './hooks'
import { useMainStore } from './store'

const store = useMainStore()
const { routesIntermsOfUserRoles } = authHook()

watch(() => [store.setIsLoggedIn], async () => {
  await routesIntermsOfUserRoles()
})

onBeforeMount(async () => routesIntermsOfUserRoles())

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
