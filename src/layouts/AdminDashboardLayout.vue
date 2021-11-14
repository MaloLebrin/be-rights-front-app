<template>
  <AdminMenuDrawer />
  <main class="w-full flex-shrink">
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
import useMainStore from "@/store/mainStore"

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