<template>
  <div class="flex flex-col justify-center w-full">
    <Header />
    <main class="w-full min-h-screen mx-auto">
      <router-view
        class=""
      />
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