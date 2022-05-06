<template>
<div class="min-h-screen px-8 py-6 text-left transition-all duration-500 ease-in-out transform md:px-20 lg:px-32">
  <Userform :id="userId" />
</div>
</template>

<script setup lang="ts">
const { params } = useRoute()

const userId = computed(() => parseInt(params.userId as string))
</script>
