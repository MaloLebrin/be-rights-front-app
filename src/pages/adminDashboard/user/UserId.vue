<template>
<div class="min-h-screen px-8 py-6 text-left transition-all duration-500 ease-in-out transform md:px-20 lg:px-32">
  <HeaderList>
    <template #title>
      <UserIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />
      {{ user.firstName }} {{ user.lastName }}
    </template>
  </HeaderList>

  <div class="space-y-10">
    <div class="py-4 mt-24 space-y-32">
      <Userform :id="userId" />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
const userStore = useUserStore()

const { params } = useRoute()

const userId = computed(() => parseInt(params.userId as string))
const user = computed(() => userStore.getOne(userId.value))
</script>
