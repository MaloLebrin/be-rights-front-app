<template>
  <div class="relative inline-flex">
    <textarea
      v-bind="$attrs"
      :disabled="disabled"
      :aria-disabled="disabled"
      :placeholder="placeholder"
      :aria-placeholder="placeholder"
      :value="innerValue"
      :class="['w-full px-4 py-3 border rounded disabled:border-grey disabled:bg-grey-light focus:outline-none text-gray-800',
      { 'border-red-300': error?.length },
      { 'cursor-not-allowed': disabled }]"
    />
    <p v-if="error?.length" class="text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  placeholder?: string
  disabled?: boolean
  error?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  disabled: false,
  error: null,
})

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const innerValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue)
})
</script>
