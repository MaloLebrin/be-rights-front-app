<template>
<div class="relative min-h-screen py-6 text-left transition-all duration-500 ease-in-out transform">
  <FileList :files="files" />
</div>
</template>

<script setup lang="ts">
const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
const { fetchAllByUserId } = fileHook()
const fileStore = useFileStore()
const { getCurrentUserId } = useUserStore()

const files = computed(() => fileStore.getWhereArray(file => file.createdByUser === getCurrentUserId))

onMounted(async () => {
  if (getCurrentUserId) {
    IncLoading()
    await fetchAllByUserId(getCurrentUserId)
    DecLoading()
  }
})
</script>
