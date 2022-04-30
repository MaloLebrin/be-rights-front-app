<template>
<div
  class="relative px-4 py-6 text-left transition-all duration-500 ease-in-out transform"
>
  <EventDetails
    class="mt-12"
    :event-id="eventId"
  />
</div>
</template>

<script setup lang="ts">
const { params } = useRoute()

const eventId = computed(() => parseInt(params.eventId as string))
</script>
