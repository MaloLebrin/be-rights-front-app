<template>
  <RouterLink
    v-if="href"
    v-bind="$attrs"
    :disabled="disabled"
    :aria-disabled="disabled"
    :to="href"
    :class="[
      'flex justify-center px-4 py-2 sm:text-sm md:text-base font-medium border border-transparent rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transform transition hover:-translate-y-1 hover:scale-105 duration-300 ease-in-out',
      colorClasses,
      { 'inline-flex flex-row items-center space-x-8': $slots.icon },
      { 'justify-start': $slots.icon && $slots.default },
      { 'justify-center': $slots.icon && !$slots.default },
      { 'cursor-not-allowed opacity-70': disabled },
      'font-link',
      $attrs['class'] || '',
    ]"
    @click="onClick($event)"
  >
    <span v-if="$slots.icon" class="w-6 h-6">
      <slot name="icon" />
    </span>
    <slot />
  </RouterLink>
  <component
    :is="tag"
    v-else
    v-bind="$attrs"
    :type="type"
    :disabled="disabled"
    :aria-disabled="disabled"
    :class="[
      'flex justify-center px-4 py-2 sm:text-sm md:text-base font-medium border border-transparent rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transform transition hover:-translate-y-1 hover:scale-105 duration-300 ease-in-out',
      colorClasses,
      { 'inline-flex flex-row items-center space-x-8': $slots.icon },
      { 'justify-start': $slots.icon && $slots.default },
      { 'justify-center': $slots.icon && !$slots.default },
      { 'cursor-not-allowed opacity-70': disabled },
      $attrs['class'] || '',
    ]"
    @click="onClick($event)"
  >
    <div v-if="$slots.icon" class="w-24 h-24">
      <slot name="icon" />
    </div>
    <div>
      <slot />
    </div>
  </component>
</template>

<script
  setup
  lang="ts"
>
const mainStore = useMainStore()

interface Props {
  tag?: string,
  href?: string,
  type?: 'button' | 'submit',
  disabled?: boolean,
  variant?: 'default' | 'social',
  color?: 'purple' | 'white' | 'red' | 'green' | 'blue'
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'button',
  type: 'button',
  disabled: false,
  color: 'blue',
  variant: 'default',
  href: undefined,
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

  if (['white'].includes(props.color) || mainStore.isDarkTheme) {
    textColorClass = 'text-blue'
    backgroundClass = 'bg-white'
  }
  return `${backgroundClass} ${textColorClass} focus:ring-${props.color}-500`
})



function onClick(event: Event) {
  emit('onClick', event)
}
</script>
