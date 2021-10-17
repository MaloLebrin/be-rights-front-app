<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <component
        :is="Component"
        :key="route.path"
      />
    </transition>
  </router-view>
</template>
<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import { useMainStore } from '@/store/mainStore'
import userHook from '@/hooks/userHook'

export default defineComponent({
  setup() {
    const store = useMainStore()
    const { routesIntermsOfUserRoles } = userHook()

    watch(() => [store.setIsLoggedIn,], () => {
      routesIntermsOfUserRoles()
    })
    routesIntermsOfUserRoles()

    const isLoggedIn = computed(() => store.isLoggedIn)

    return {
      isLoggedIn,
    }
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
  background-color: grey;
}
</style>
