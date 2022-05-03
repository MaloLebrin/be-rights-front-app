<template>
<div
  class="container min-h-screen px-8 py-6 text-left transition-all duration-500 ease-in-out transform md:px-20 lg:px-32"
>
  <EventForm
    :event-id="eventId"
    :mode="ModalModeEnum.EDIT"
  />
</div>
</template>

<script setup lang="ts">
import { ModalModeEnum } from '@/types/typesExported'
const { params } = useRoute()

const eventId = computed(() => parseInt(params.eventId as string))
</script>
