<template>
  <div class="flex flex-col justify-center w-full">
    <Header />
    <main class="container w-full min-h-screen mx-auto">
      <BLoader
        v-if="-isLoading "
        :isLoading="isLoading"
      />
      <router-view v-else />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from "~/store/mainStore"

export default defineComponent({
  name: 'DefaultLayout',
  setup() {
    const mainStore = useMainStore()
    const { isLoading } = storeToRefs(mainStore)
    return {
      isLoading
    }
  },
})
</script>