<template>
<div
  class="relative min-h-screen py-6 pr-8 text-left transition-all duration-500 ease-in-out transform dark:bg-blue-dark pl-14"
>
  <div class="mt-4 space-y-4">
    <BaseMessage type="warning">
      <div class="flex flex-col space-y-2">
        <span>Ce formulaire vous permet de nous signaler un problème sur la plateforme.</span>
        <span>Vous pouvez aussi nous soumettre vos recommendations et suggestions.</span>
      </div>
    </BaseMessage>

    <BugsBugCreationForm />
  </div>
</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-layout',
  isAuth: true,
  isAdmin: true,
})
</script>
