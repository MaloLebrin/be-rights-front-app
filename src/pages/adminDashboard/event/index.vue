<template>
<div
  class="relative min-h-screen px-4 py-6 text-left transition-all duration-500 ease-in-out transform"
>
  <EventList
    no-event-message="Aucun Event en Base de donnée"
  />
</div>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router'

const { setFilters } = useTableStore()

onBeforeRouteLeave(() => {
  setFilters(null)
})
</script>
