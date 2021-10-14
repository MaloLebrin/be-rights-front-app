<template>
  <div>

    <main>
      <router-view />
    </main>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { UserType } from './store/users/types'
import { useUserStore } from './store/users/userStore'
export default defineComponent({
  setup() {
    const store = useUserStore()
    const user = {
      email: 'test@email.com',
      firstName: 'malo',
      lastName: 'lebrin',
      companyName: 'kissmy',
      siret: '5735757657',
    }
    // store.addUser(user as UserType)
    // store.setCurrentUser(user as UserType)
    // console.log(store.getCurrentUserFullName, 'store.users')
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
  margin-top: 60px;
}
</style>
