<template>
  <div class="flex flex-col justify-center w-full">
    <Header />
    <main class="w-full min-h-screen mx-auto">
      <Loader
        :isLoading="isLoading"
        :type="LoaderTypeEnum.BOUNCE"
      />
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/store'
import { LoaderTypeEnum } from '@/types'

export default defineComponent({
  name: 'DefaultLayout',
  setup() {
    const mainStore = useMainStore()
    const { isLoading } = storeToRefs(mainStore)

  return {
      isLoading,
      LoaderTypeEnum,
    }
  },
})
</script>