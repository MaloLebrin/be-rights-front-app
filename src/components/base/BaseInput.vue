<template>
<div class="space-y-2">
  <input
    v-bind="$attrs"
    v-model="innerValue"
    :disabled="disabled"
    :aria-disabled="disabled"
    :placeholder="placeholder"
    :aria-placeholder="placeholder"
    :type="type"
    :class="['appearance-none block shadow-md py-2 px-4 border focus:ring-purple-500 focus:border-purple-500 w-full sm:text-sm border-gray-300 rounded-md text-gray-800',
             { 'border-red-300': error?.length },
             { 'cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-200': disabled },
    ]"
  >
  <p
    v-if="error?.length"
    class="text-sm text-red-500"
  >
    {{ error }}
  </p>
</div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | null | number
  type?: 'email' | 'password' | 'search' | 'text' | 'tel' | 'url' | 'date'
  disabled?: boolean
  placeholder?: string
  error?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  placeholder: '',
  error: null,
})

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string | null | number): void
}>()

const innerValue = computed({
  get: () => props.modelValue,
  set: newValue => emit('update:modelValue', newValue),
})
</script>
