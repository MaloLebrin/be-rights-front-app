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
    :class="['appearance-none block w-full px-4 py-3 border rounded disabled:border-grey disabled:bg-grey-light focus:outline-none text-black border-blue hover:border-blue-dark focus:ring-2 ring-blue',
             { 'border-red-300': error?.length },
             { 'cursor-not-allowed': disabled },
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
