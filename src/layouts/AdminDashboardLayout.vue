<template>
  <AdminMenuDrawer />
  <main class="text-black dark:text-white w-full bg-white flex-shrink">
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
import { useMainStore } from "~/store/mainStore"

export default defineComponent({
  name: 'AdminDashboardLayout',
  setup() {
    const mainStore = useMainStore()
    const { isLoading } = storeToRefs(mainStore)
    return {
      isLoading
    }
  },
})
</script>