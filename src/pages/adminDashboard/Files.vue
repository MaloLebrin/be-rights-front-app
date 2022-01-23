<template>
  <div
    class="container relative min-h-screen py-6 pr-8 mx-auto text-left transition-all duration-500 ease-in-out transform dark:bg-blue-dark pl-14"
  >
    <HeaderList>
      <template #title>
        <FolderOpenIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />Fichiers
      </template>
    </HeaderList>
    <FileList :files="files" />
  </div>
</template>

<script setup lang="ts">
import { fileHook } from '@/hooks'
import { useFileStore, useUiStore } from '@/store'

const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
const { fetchAll } = fileHook()
const fileStore = useFileStore()

const files = computed(() => fileStore.getAllArray)

onMounted(async () => {
  IncLoading()
  await fetchAll()
  DecLoading()
})
</script>

<route>
{meta: {
  layout: "AdminDashboardLayout"
}
}
</route>
