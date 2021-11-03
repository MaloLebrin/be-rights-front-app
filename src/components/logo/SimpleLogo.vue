<template>
  <div
    class="flex w-full items-center justify-center mb-10 cursor-pointer"
    @click="redirectHome"
  >
    <div class="rounded-full border-red border-4 w-10 h-10">
      <div class="rounded-full bg-red-light w-4 h-4 m-2" />
    </div>
    <h1 class="text-black dark:text-white font-bold text-3xl ml-2">Be right</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import router from '~/router'

export default defineComponent({
  name: 'SimpleLogo',
  setup() {
    function redirectHome() {
      router.push('/')
    }
    return {
      redirectHome
    }
  }
})
</script>
