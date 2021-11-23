<template>
<div class="bg-white-light dark:bg-blue-dark min-h-screen transform ease-in-out transition-all duration-500 py-6 text-left pl-14 pr-8">
	<HeaderList />

</div>
</template>
<route>
{meta: {
  layout: "AdminDashboardLayout",
  middleware: ["users"]
}
}
</route>

<script setup lang="ts">
import { onMounted } from 'vue'
import userHook from '@/hooks/userHook'
import useMainStore from '@/store/mainStore'
const { fetchAll } = userHook()
    const mainStore = useMainStore()
console.log(mainStore.getIsLoading, 'mainStore.getIsLoading')
onMounted( () => fetchAll())
</script>