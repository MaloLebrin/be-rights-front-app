<template>
<div class="min-h-screen px-8 py-6 text-left transition-all duration-500 ease-in-out transform md:px-16 lg:px-24">
  <EventForm
    :mode="ModalModeEnum.CREATE"
  />
</div>
</template>

<script setup lang="ts">
import { ModalModeEnum } from '@/types/typesExported'
</script>
