<template>
<div class="min-h-screen px-8 py-6 text-left transition-all duration-500 ease-in-out transform md:px-20 lg:px-32">
  <HeaderList>
    <template #title>
      <FolderOpenIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />Fichiers
    </template>
  </HeaderList>
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

onMounted(async() => {
  if (getCurrentUserId) {
    IncLoading()
    await fetchAllByUserId(getCurrentUserId)
    DecLoading()
  }
})
</script>
