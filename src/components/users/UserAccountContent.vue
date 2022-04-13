<template>
<div class="container relative py-4 space-y-12 bg-white shadow-xl dark:bg-blue-dark_bold rounded-2xl">
  <UserDetails
    v-if="userStore.getCurrentUserId"
    :id="userStore.getCurrentUserId"
  />
</div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
</script>
