<template>
<div class="relative flex mt-px sm:col-start-3">
  <div
    :class="`flex flex-col p-2 overflow-y-auto text-xs leading-5 rounded-lg group inset-1 bg-${getRoleColor()}-50 hover:bg-${getRoleColor()}-100`"
  >
    <p
      :class="`text-${getRoleColor()}-500 group-hover:text-${getRoleColor()}-700 font-semibold`"
    >
      {{ getSuscriptionTranslation(subscription) }}
    </p>
  </div>
</div>
</template>

<script setup lang="ts">
import { SubscriptionEnum } from '@/types/typesExported'

interface Props {
  subscription: SubscriptionEnum
}

const props = defineProps<Props>()

const { getSuscriptionTranslation } = subscriptionHook()

function getRoleColor() {
  switch (props.subscription) {
    case SubscriptionEnum.PREMIUM:
      return 'green'
    case SubscriptionEnum.MEDIUM:
      return 'orange'
    case SubscriptionEnum.BASIC:
      return 'sky'

    default:
      return 'sky'
  }
}
</script>
