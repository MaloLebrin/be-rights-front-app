<template>
<div class="min-h-screen py-6 pr-8 space-y-20 text-left transition-all duration-500 ease-in-out transform pl-14">
  <UsersUserform
    v-if="userStore.getCurrentUserId"
    :id="userStore.getCurrentUserId"
  />
</div>
</template>

<script setup lang="ts">
import { useUserStore } from '~~/store'

const userStore = useUserStore()
definePageMeta({
  layout: 'dashboard-layout',
  isAuth: true,
  isAdmin: true,
})
</script>
