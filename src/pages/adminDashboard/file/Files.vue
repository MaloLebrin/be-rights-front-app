<template>
<div
  class="relative min-h-screen px-4 py-6 text-left transition-all duration-500 ease-in-out transform"
>
  <FileList :files="files" />
</div>
</template>

<script setup lang="ts">
const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
const { fetchAll } = fileHook()
const fileStore = useFileStore()
const tableStore = useTableStore()

const files = computed(() => fileStore.getAllArray)

watch(() => tableStore.getFinalUrl, async newValue => {
  IncLoading()
  fileStore.resetState()
  await fetchAll(newValue)
  DecLoading()
})

onMounted(async() => {
  IncLoading()
  await fetchAll()
  DecLoading()
})
</script>
