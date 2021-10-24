<template>
  <router-view v-slot="{ Component, route }">
    <component
      :is="Component"
      :key="route.path"
    />
  </router-view>
</template>
<script lang="ts">
import { computed, defineComponent, watch, onBeforeMount } from 'vue'
import { useMainStore } from '@/store/mainStore'
import userHook from '@/hooks/userHook'

export default defineComponent({
  setup() {
    const store = useMainStore()
    const { routesIntermsOfUserRoles } = userHook()

    watch(() => [store.setIsLoggedIn,], async () => {
      await routesIntermsOfUserRoles()
    })

    onBeforeMount(async () => await routesIntermsOfUserRoles())

  },
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
  background-color: white;
}
</style>
