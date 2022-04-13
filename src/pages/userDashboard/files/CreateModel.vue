<template>
<div class="min-h-screen px-8 py-6 text-left transition-all duration-500 ease-in-out transform md:px-20 lg:px-32">
  <div class="flex items-center">
    <FolderAddIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />
    <h1 class="flex items-center max-w-xs text-2xl font-semibold text-gray-800 dark:text-white mt">
      Créer un fichier
    </h1>
  </div>

  <div class="mt-4">
    <FileForm :mode="ModalModeEnum.CREATE" />
  </div>
</div>
</template>

<script setup lang="ts">
import { ModalModeEnum } from '@/types/typesExported'
</script>
