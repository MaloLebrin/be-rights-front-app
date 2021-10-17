<template>
  <MenuDrawer v-if="isLoggedIn" />
  <main class="min-h-screen min-w-full">
    <router-view />
  </main>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useMainStore } from './store/mainStore'

export default defineComponent({
  setup() {
    const store = useMainStore()
    // const user = {
    //   id: 1,
    //   email: 'malolebrin@gmail.com',
    //   firstName: 'Malo',
    //   lastName: 'Lebrin',
    //   companyName: 'kissmy',
    //   siret: '5735757657',
    // }
    // console.log(store.getCurrent, 'store.getCurrent')
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
  /* align-items: center;
  justify-content: center; */
  background-color: grey;
}
</style>
