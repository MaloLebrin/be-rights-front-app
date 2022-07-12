<template>
<tr>
  <td class="py-4 text-sm font-medium text-gray-900 truncate whitespace-nowrap sm:pl-6">
    {{ user.id }}
  </td>
  <td class="py-4 pl-4 text-sm font-medium text-gray-900 truncate whitespace-nowrap sm:pl-6">
    {{ getUserfullName(user) }}
  </td>
  <td class="px-3 py-4 text-sm text-gray-500 truncate whitespace-nowrap">
    <UserSubscriptionTag :subscription="user.subscription" />
  </td>
  <td class="px-3 py-4 text-sm text-gray-500 truncate whitespace-nowrap">
    {{ user.email }}
  </td>
  <td class="px-3 py-4 text-sm text-gray-500 truncate whitespace-nowrap">
    {{ toFormat(user.createdAt, 'D MMMM YYYY') }}
  </td>
  <td class="px-3 py-4 text-sm text-center text-gray-500 truncate whitespace-nowrap">
    <UserRoleTag :role="user.roles" />
  </td>
  <td class="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
    <BaseButton
      :href="{ name: 'admin.users.show', params: { userId: user.id } }"
    >
      Voir
    </BaseButton>
  </td>
</tr>
</template>

<script setup lang="ts">
import type { UserType } from '@/types'

interface Props {
  user: UserType
}

defineProps<Props>()

const { getUserfullName } = userHook()
const { toFormat } = dateHook()
</script>
