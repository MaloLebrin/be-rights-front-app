<template>
  <router-view v-slot="{ Component, route }">
    <component
      :is="Component"
      :key="route.path"
    />
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

    onBeforeMount(async () => await routesIntermsOfUserRoles())

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
}
</style>
