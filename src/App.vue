<template>
  <MenuDrawer />
  <main class="min-h-screen">
    <router-view />
  </main>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { UserType } from '@/store/users/types'
import { useUserStore } from '@/store/users/userStore'
import axiosInstance from "@/axios.config"

export default defineComponent({
  setup() {
    const store = useUserStore()
    const user = {
      id: 1,
      email: 'malolebrin@gmail.com',
      firstName: 'Malo',
      lastName: 'Lebrin',
      companyName: 'kissmy',
      siret: '5735757657',
    }
    store.createOne(user as UserType)
    store.setCurrent(user as UserType)
    // console.log(store.getCurrent, 'store.getCurrent')
    console.log(import.meta.env.VITE_API_URL, 'import.meta.env.VITE_SOME_KEY')

    async function test() {
      const res = await axiosInstance.get('')
      console.log(res, 'res')
    }
    test()
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
