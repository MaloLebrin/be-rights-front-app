<template>
  <div class="flex justify-center">
    <div
      class="relative inline-block w-12 mr-2 align-middle select-none transition transform duration-300 ease-in-out"
    >
      <input
        :value="updatedValue"
        v-bind="$attrs"
        :checked="updatedValue"
        type="checkbox"
        id="toggle"
        class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        :class="{ 'right-0 border-green': updatedValue }"
        @input="toggleSwitch"
      />
      <div
        class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
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
