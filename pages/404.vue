<template>
<div class="flex flex-col items-center justify-center w-full min-h-screen space-y-4">
  <h2 class="text-2xl font-bold dark:text-white">
    Oops Vous n'êtes pas sur la bonne page
  </h2>

  <BaseButton href="/">
    retourner à l'accueil
  </BaseButton>
</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default-layout',
  isAuth: false,
  isAdmin: false,
})
</script>
