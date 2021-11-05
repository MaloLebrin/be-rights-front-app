<template>
  <div class="bg-red-light w-14 h-14 md:w-28 md:h-28 rounded-full opacity-90 flex justify-center items-center">
    <span class="text-black font-extrabold text-5xl md:text-9xl bg-none">{{ stepNumber }}</span>
  </div>
</template>
<script setup lang="ts">
interface Props {
  stepNumber: number
}
withDefaults(defineProps<Props>(), {
  stepNumber: 0
})
</script>
