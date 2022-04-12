<template>
  <RouterLink v-if="href" v-bind="$attrs" :disabled="disabled" :aria-disabled="disabled" :to="href" :class="[
    'flex justify-center px-4 py-2 sm:text-sm md:text-base font-medium border border-transparent rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transform transition hover:-translate-y-1 hover:scale-105 duration-300 ease-in-out',
    colorClasses,
    { 'inline-flex flex-row items-center space-x-2': $slots.icon },
    { 'justify-start': $slots.icon && $slots.default },
    { 'justify-center': $slots.icon && !$slots.default },
    { 'cursor-not-allowed opacity-70': disabled },
    'font-link',
    $attrs['class'] || '',
  ]" @click="onClick($event)">
    <span v-if="$slots.icon" class="w-6 h-6">
      <slot name="icon" />
    </span>
    <slot />
    <template v-if="isLoading">
      <div class="w-6 h-6 ml-4 border-t-2 border-b-2 border-white rounded-full animate-spin" />
    </template>
  </RouterLink>
  <component :is="tag" v-else v-bind="$attrs" :type="type" :disabled="disabled" :aria-disabled="disabled" :class="[
    'flex items-center justify-center px-4 py-2 sm:text-sm md:text-base font-medium border border-transparent rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transform transition hover:-translate-y-1 hover:scale-105 duration-300 ease-in-out',
    colorClasses,
    { 'inline-flex flex-row items-center space-x-2': $slots.icon },
    { 'justify-start': $slots.icon && $slots.default },
    { 'justify-center': $slots.icon && !$slots.default },
    { 'cursor-not-allowed opacity-70': disabled },
    $attrs['class'] || '',
  ]" @click="onClick($event)">
    <div v-if="$slots.icon" class="w-6 h-6">
      <slot name="icon" />
    </div>
    <div class="flex items-center justify-center">
      <slot />
      <template v-if="isLoading">
        <div class="w-6 h-6 ml-4 border-t-2 border-b-2 border-white rounded-full animate-spin" />
      </template>
    </div>
  </component>
</template>

<script
  setup
  lang="ts"
>
const mainStore = useMainStore()

interface Props {
  tag?: string
  href?: string | null
  type?: 'button' | 'submit'
  disabled?: boolean,
  variant?: 'default' | 'social',
  color?: 'purple' | 'white' | 'red' | 'green' | 'blue'
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'button',
  type: 'button',
  disabled: false,
  color: 'blue',
  variant: 'default',
  href: null,
  isLoading: false,
})

const emit = defineEmits<{
  (e: 'onClick', event: Event): void
}>()

const colorClasses = computed(() => {
  let textColorClass = 'text-white'
  let backgroundClass = `bg-${props.color}-600`
  if (props.color === 'blue') {
    backgroundClass = 'bg-blue'
  }

  if (props.color === 'white' || (mainStore.isDarkTheme && !['red', 'green'].includes(props.color))) {
    textColorClass = 'text-blue'
    backgroundClass = 'bg-white'
  }
  return `${backgroundClass} ${textColorClass} focus:ring-${props.color}-500`
})

function onClick(event: Event) {
  emit('onClick', event)
}
</script>
