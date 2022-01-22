<template>
  <div class="fixed grid items-center grid-cols-3 mb-14">
    <h3 class="flex items-center max-w-xs text-2xl font-semibold text-gray-800 dark:text-white mt">
      <slot name="title" />
    </h3>
    <div v-if="$slots.additionnalButtons" class="flex items-center justify-center col-span-2">
      <slot name="additionnalButtons" />
    </div>
  </div>
</template>
