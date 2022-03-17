<template>
  <div class="relative inline-flex">
    <textarea
      v-bind="$attrs"
      :disabled="disabled"
      :aria-disabled="disabled"
      :placeholder="placeholder"
      :aria-placeholder="placeholder"
      :value="innerValue"
      :class="classes"
    />
  </div>
</template>

<script setup lang="ts">

enum InputStatusesEnum {
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
  DEFAULT = 'default'
}

interface Props {
  modelValue: string
  placeholder?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const innerValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue)
})

const fieldStatus = inject('fieldStatus', computed(() => InputStatusesEnum.DEFAULT))

const commonClasses = 'w-full px-4 py-3 border rounded text-black disabled:border-grey disabled:bg-grey-light focus:outline-none text-gray-800 dark:text-white'

const classes = computed(() => {
  switch (fieldStatus.value) {
    case InputStatusesEnum.WARNING:
      return `${commonClasses} border-orange hover:border-orange-dark focus:ring-2 ring-orange`

    case InputStatusesEnum.ERROR:
      return `${commonClasses} border-red hover:border-red-dark focus:ring-2 ring-red`

    case InputStatusesEnum.SUCCESS:
      return `${commonClasses} border-green hover:border-green-dark focus:ring-2 ring-green`

    default:
      return `${commonClasses} border-blue hover:border-blue-dark focus:ring-2 ring-blue`
  }
})
</script>