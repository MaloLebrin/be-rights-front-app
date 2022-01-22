<template>
  <div
    class="min-h-screen py-6 pr-8 text-left transition-all duration-500 ease-in-out transform pl-14"
  >
    <HeaderList>
      <template #title>
        <UserIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />
        {{ user.firstName }} {{ user.lastName }}
      </template>
    </HeaderList>
    <div class="py-4 mt-24 rounded-lg shadow-lg">
      <Userform :id="userStore.getFirstActive" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'
import { onBeforeRouteLeave } from 'vue-router'

const userStore = useUserStore()
const { resetActive } = userStore

onBeforeRouteLeave(() => {
  resetActive()
})

const user = computed(() => userStore.getOne(userStore.getFirstActive))

</script>

<route>
{meta: {
  layout: "AdminDashboardLayout",
}
}
</route>
