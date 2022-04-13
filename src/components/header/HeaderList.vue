<template>
  <div class="grid items-center w-full grid-cols-3 mb-14">
    <div class="flex items-center space-x-4">
      <a class="flex items-center space-x-2 text-gray-500 cursor-pointer dark:text-white-break hover:underline"
        @click="goBack">
        <ChevronLeftIconOutline class="w-5 h-5" />
        <span>Retour</span>
      </a>
      <h3 class="flex items-center text-2xl font-semibold text-gray-800 dark:text-white mt">
        <slot name="title" />
      </h3>
    </div>
    <div v-if="$slots.additionnalButtons" class="flex items-center justify-center col-span-2 space-x-4">
      <slot name="additionnalButtons" />
    </div>
  </div>
</template>
<!-- TODO one col when slot is empty -->

<script setup lang="ts">
const router = useRouter()

function goBack() {
  router.back()
}
</script>