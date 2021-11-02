<template>
  <span class="text-blue font-bold">Thème</span>
  <div
    class="w-14 h-8 bg-gray-300 rounded-full flex-shrink-0 p-1"
    :class="{ 'bg-blue': isTrue}"
    @click="toggleTrue"
  >
    <div
      class="w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out"
      :class="isTrue ? 'translate-x-6 bg-white' : 'bg-blue'"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'DarkModeToggle',
  setup() {
    const isTrue = ref(false)
    function toggleTrue() {
      isTrue.value = !isTrue.value
    }
    return {
      isTrue,
      toggleTrue,
    }
  },
})
</script>
