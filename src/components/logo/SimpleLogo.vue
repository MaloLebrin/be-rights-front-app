<template>
  <div
    class="flex w-full items-center justify-center cursor-pointer"
    @click="redirectHome"
  >
    <div class="rounded-full border-red border-4 w-10 h-10">
      <div class="rounded-full bg-red-light w-4 h-4 m-2" />
    </div>
    <h1 class="text-black dark:text-white font-bold text-3xl ml-2">Be right</h1>
  </div>
</template>

<script setup lang="ts">
import router from '~/router'

function redirectHome() {
  router.push('/')
}
</script>
