<template>
<div class="min-h-screen px-8 py-6 text-left transition-all duration-500 ease-in-out transform md:px-20 lg:px-32">
  <div
    v-if="user"
    class="mt-8 space-y-10"
  >
    <UsersUserDetails :id="userId" />
  </div>
</div>
</template>

<script setup lang="ts">
import { useUserStore } from '~~/store'

const { params } = useRoute()
const userStore = useUserStore()

const userId = computed(() => parseInt(params.userId as string))
const user = computed(() => userStore.getOne(userId.value))
</script>
