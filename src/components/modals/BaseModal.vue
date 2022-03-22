<template>
  <div
    id="base-modal"
    v-show="isModalOpen"
    class="absolute top-0 left-0 right-0 flex items-center justify-center w-full transition duration-700 ease-in-out bg-white rounded-lg shadow-2xl dark:bg-blue-dark_bold"
  >
    <div class="relative w-full h-full px-5 py-4 rounded-lg shadow-2xl">
      <div class="mb-4 text-xl font-semibold text-center text-black dark:text-white">
        {{ title }}
        <div
          class="absolute flex items-center justify-center w-6 h-6 text-2xl text-white rotate-45 rounded-full cursor-pointer right-2 top-2 bg-blue-dark_bold dark:bg-white dark:text-blue-dark_bold"
          @click="closeModal"
        >+</div>
      </div>
      <Loader v-if="isLoading" :isLoading="isLoading" :type="LoaderTypeEnum.BOUNCE" />
      <div v-else>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LoaderTypeEnum } from '@/types/index'

interface Props {
  isActive: boolean
  title: string
  isLoading: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  title: '',
  isLoading: false,
})

const isLoading = ref(props.isLoading)
const isModalOpen = ref(props.isActive)

watch(() => props.isActive, newVal => {
  isModalOpen.value = newVal
})

function closeModal() {
  isModalOpen.value = false
  emit('close')
}

const emit = defineEmits<{
  (e: 'close'): void
}>()

</script>
