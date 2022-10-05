<template>
<tr>
  <td class="py-4 text-sm font-medium text-gray-900 truncate whitespace-nowrap sm:pl-6">
    {{ newsletterItem.id }}
  </td>
  <td class="px-3 py-4 text-sm text-gray-500 truncate whitespace-nowrap">
    {{ newsletterItem.email }}
  </td>
  <td class="px-3 py-4 text-sm text-gray-500 truncate whitespace-nowrap">
    {{ toFormat(newsletterItem.createdAt, 'D MMMM YYYY') }}
  </td>
  <td class="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
    <BaseButton
      color="red"
      :disabled="uiStore.getUIIsLoading"
      :is-loading="uiStore.getUIIsLoading"
      @click="deleteOne(newsletterItem.id)"
    >
      Supprimer
    </BaseButton>
  </td>
</tr>
</template>

<script setup lang="ts">
import type { NewsletterType } from '@/types'
import { useUiStore } from '~~/store'

interface Props {
  newsletterItem: NewsletterType
}

defineProps<Props>()
const { toFormat } = dateHook()
const { deleteOne } = newsletterHook()
const uiStore = useUiStore()
</script>
