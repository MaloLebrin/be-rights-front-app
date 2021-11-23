<template>
<div
    v-if="isLoading"
    class="flex flex-col justify-center items-center opacity-25 absolute top-0 right-0 left-0 bottom-0"
  >
    <div
      v-if="type === LoaderTypeEnum.SPINNER"
      class="animate-spin rounded-full h-32 w-32 border-b-4 dark:border-white-break border-blue-dark opacity-1 z-10"
    />
    <div
      v-else-if="type === LoaderTypeEnum.BOUNCE"
      class="flex gap-2"
    >
      <div
        class="AnimateBounce animate-bounce"
      />
      <div
        class="AnimateBounce animate-bounce200"
      />
      <div
        class="AnimateBounce animate-bounce400"
      />
    </div>

    <span
      v-if="message"
      class="mt-4"
    >{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
import { LoaderTypeEnum } from '@/types/globals'

interface Props {
	isLoading: boolean
	message?: string
	type: LoaderTypeEnum
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
  message: undefined,
  type: LoaderTypeEnum.SPINNER,
})

</script>
<style scoped>
  .AnimateBounce {
    @apply h-4 w-4 bg-blue-dark dark:bg-white rounded-full
  }
</style>
