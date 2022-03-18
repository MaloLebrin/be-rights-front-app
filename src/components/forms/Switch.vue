<template>
  <div class="flex justify-center">
    <div
      class="relative inline-block w-12 mr-2 align-middle transition duration-300 ease-in-out transform select-none"
    >
      <input
        :value="updatedValue"
        v-bind="$attrs"
        :checked="updatedValue"
        type="checkbox"
        id="toggle"
        class="absolute block w-6 h-6 bg-white border-4 rounded-full appearance-none cursor-pointer toggle-checkbox"
        :class="{ 'right-0 border-green': updatedValue }"
        @input="toggleSwitch"
      />
      <div
        class="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer toggle-label"
        :class="{ 'bg-green': updatedValue }"
      />
    </div>
    <label class="text-gray-700 dark:text-white-break">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">

interface SwitchProps {
  label: string
  checked: boolean
}

const props = withDefaults(defineProps<SwitchProps>(), {
  label: '',
  checked: false,
})
const emit = defineEmits<{
  (e: 'update:checked', value: boolean): void
}>()

const updatedValue = ref(props.checked)

function toggleSwitch() {
  updatedValue.value = !updatedValue.value
  emit('update:checked', updatedValue.value)
}
</script>
