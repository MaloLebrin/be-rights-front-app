<template>
<div class="flex justify-center item-center sm:col-start-3">
  <div
    class="flex item-center justify-center p-2 overflow-y-auto text-xs rounded-lg"
    :class="[`bg-${getFileTypeColor()}-50 hover:bg-${getFileTypeColor()}-100 border border-${getFileTypeColor()}-500 hover:border-${getFileTypeColor()}-700`]"
  >
    <p
      :class="`text-${getFileTypeColor()}-500 group-hover:text-${getFileTypeColor()}-700 font-semibold uppercase`"
    >
      {{ getTranslationFileType(type) }}
    </p>
  </div>
</div>
</template>

<script setup lang="ts">
import { FileTypeEnum } from '@/types'

interface Props {
  type: FileTypeEnum
}

const props = defineProps<Props>()

const { getTranslationFileType } = fileHook()

function getFileTypeColor() {
  switch (props.type) {
    case FileTypeEnum.BUG_REPORT:
      return 'sky'
    case FileTypeEnum.IMAGE_RIGHT:
      return 'orange'
    case FileTypeEnum.LOGO:
      return 'yellow'
    case FileTypeEnum.MODEL:
      return 'green'
    case FileTypeEnum.PROFILE_PICTURE:
      return 'blue'
    default:
      return 'gray'
  }
}
</script>
