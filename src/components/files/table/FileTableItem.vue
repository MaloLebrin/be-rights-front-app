<template>
<tr>
  <td class="py-4 text-sm font-medium text-gray-900 truncate whitespace-nowrap sm:pl-6">
    {{ file.id }}
  </td>
  <td class="py-4 pl-4 text-sm font-medium text-gray-900 truncate whitespace-nowrap sm:pl-6">
    {{ file.name }}
  </td>
  <td class="px-3 py-4 text-sm text-gray-500 truncate whitespace-nowrap">
    <FileTypeTag :type="file.type" />
  </td>
  <td class="px-3 py-4 text-sm text-gray-500 truncate whitespace-nowrap">
    {{ toFormat(file.createdAt, 'D MMMM YYYY') }}
  </td>
  <td class="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
    <!-- <ActionButtonTable :event="event" /> -->
  </td>
</tr>
</template>

<script setup lang="ts">
import type { FileType } from '@/types/typesExported'
// import { ModalModeEnum, ModalNameEnum } from '@/types/typesExported'

interface Props {
  file: FileType
}

defineProps<Props>()

const { toFormat } = dateHook()
// const { setUiModal } = useUiStore()

// function updateFile(file: FileType) {
//   setUiModal({
//     isActive: true,
//     modalName: ModalNameEnum.FILE_MODAL,
//     modalMode: ModalModeEnum.EDIT,
//     data: { file },
//   })
// }

// function downloadFile(file: FileType) {
//   const blob = new Blob([file.secure_url], { type: 'application/png' })
//   const link = document.createElement('a')
//   link.href = URL.createObjectURL(blob)
//   link.download = file.name
//   link.click()
//   URL.revokeObjectURL(link.href)
// }

// function deleteOneFile(file: FileType) {
//   setUiModal({
//     isActive: true,
//     modalName: ModalNameEnum.FILE_MODAL,
//     modalMode: ModalModeEnum.DELETE,
//     data: { file },
//   })
// }
</script>
