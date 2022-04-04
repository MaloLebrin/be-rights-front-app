<template>
  <div class="relative flex mt-px sm:col-start-3">
    <div
      :class="`flex flex-col p-2 overflow-y-auto text-xs leading-5 rounded-lg group inset-1 bg-${getStatusColor()}-50 hover:bg-${getStatusColor()}-100`"
    >
      <p
        :class="`text-${getStatusColor()}-500 group-hover:text-${getStatusColor()}-700 font-semibold uppercase`"
      >{{ getEventStatusTranslation(status) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EventStatusEnum } from '@/types/typesExported'

interface Props {
  status: EventStatusEnum
}

const props = defineProps<Props>()

const { getEventStatusTranslation } = eventHook()

function getStatusColor() {
  switch (props.status) {
    case EventStatusEnum.COMPLETED:
      return 'sky'
    case EventStatusEnum.PENDING:
      return 'orange'
    case EventStatusEnum.CLOSED:
      return 'gray'
    case EventStatusEnum.CREATE:
      return 'green'
    default:
      return 'gray'
  }
}
</script>