<template>
<div class="min-h-screen px-8 py-6 text-left transition-all duration-500 ease-in-out transform md:px-20 lg:px-32">
  <EventForm
    :mode="ModalModeEnum.CREATE"
  />
</div>
</template>

<script setup lang="ts">
import { ModalModeEnum } from '@/types/typesExported'
</script>
