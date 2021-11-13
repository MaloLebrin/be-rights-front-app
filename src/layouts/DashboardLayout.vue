<template>
  <MenuDrawer />
  <main class="text-center text-red w-full">
    <div class="w-1/4 m-auto text-center text-red bg-teal-800">
      Daashboard Layout
    </div>
    <BLoader
      v-if="isLoading"
      :isLoading="isLoading"
    />
    <router-view v-else />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import useMainStore from "~/store/mainStore"

export default defineComponent({
  name: 'DashboardLayout',
  setup() {
    const mainStore = useMainStore()
    const { isLoading } = storeToRefs(mainStore)
    return {
      isLoading
    }
  },
})
</script>