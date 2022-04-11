<template>
  <div
    class="min-h-screen py-6 pr-8 text-left transition-all duration-500 ease-in-out transform pl-14"
  >
    <HeaderList>
      <template #title>
        <UserIconOutline class="h-8 p-1 mr-4 text-white bg-gray-500 rounded-lg dark:bg-red" />
        {{ user.firstName }} {{ user.lastName }}
      </template>
    </HeaderList>

    <div class="space-y-10">
      <UserDetails :id="userId" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { params } = useRoute()
const userStore = useUserStore()

const userId = computed(() => parseInt(params.userId as string))
const user = computed(() => userStore.getOne(userId.value))
</script>
