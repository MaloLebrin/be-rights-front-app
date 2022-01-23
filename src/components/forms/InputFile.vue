<template>
  <label
    :class="[{ 'border-4 border-dashed': !imageUrl },
    'flex flex-col items-center hover:border-gray-300 py-5 cursor-pointer']"
  >
    <div v-if="!imageUrl" class="flex flex-col items-center justify-center w-full h-full">
      <PhotographIconOutline class="w-12 h-12 overflow-hidden text-gray-600" />
      <p class="mt-8 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">{{ message }}</p>
    </div>
    <img v-else :src="imageUrl" alt="Logo" class="w-48 h-48 roundeds-fulls" />
    <input type="file" id="file" ref="file" class="opacity-0" @change="emitFile" />
  </label>
</template>

<script setup lang="ts">
import { FileType } from '@/store/typesExported'

interface Props {
  message?: string
  url?: string
}

const props = withDefaults(defineProps<Props>(), {
  message: 'Sélectionnez des fichiers',
  url: undefined,
})
const emit = defineEmits<{
  (e: 'uploadFile', file: File): void
}>()

const file = ref<null | HTMLInputElement>(null)

const imageUrl = ref<undefined | string>(props.url)

function emitFile() {
  if (file.value && file.value.files) {
    const url = URL.createObjectURL(file.value.files[0])
    imageUrl.value = url
    emit('uploadFile', file.value.files[0])
  }
}

</script>