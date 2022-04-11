<template>
  <div
    class="min-h-screen py-6 pr-8 space-y-20 text-left transition-all duration-500 ease-in-out transform pl-14"
  >
    <HeaderList :withAdditionnalButtons="false" class="mb-32">
      <template #title>
        <UserIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />Mon compte
      </template>
    </HeaderList>

    <Userform :id="userStore.getCurrentUserId" />
  </div>
</template>
<script setup lang="ts">
const userStore = useUserStore()
</script>
