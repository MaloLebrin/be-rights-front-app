<template>
  <div class="px-24 py-12 rounded-lg border-2 flex" :class="colorClasses">
    <InformationCircleIconOutline v-if="type === 'default'" class="text-blue-500 w-20 h-20 mr-8" />
    <ExclamationIconOutline v-if="type === 'warning'" class="text-orange-500 w-20 h-20 mr-8" />
    <XCircleIconOutline v-if="type === 'danger'" class="text-red-500 w-20 h-20 mr-8" />
    <CheckCircleIconOutlin v-if="type === 'success'" class="text-green-500 w-20 h-20 mr-8" />

    <slot />
  </div>
</template>

<script setup lang="ts">

interface Props {
  type?: 'warning' | 'danger' | 'success' | 'default'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',

})

const colorClasses = computed(() => {
  switch (props.type) {
    case 'warning':
      return 'border-orange-500 bg-orange-100'

    case 'danger':
      return 'border-red-500 bg-red-100'

    case 'success':
      return 'border-green-500 bg-green-100'

    default:
      return 'border-blue-500 bg-blue-100'
  }
})
</script>
