<template>
<Field
  v-slot="{ field }"
  :name="name"
  type="radio"
  :value="value"
>
  <div class="flex flex-col space-y-4 text-sm">
    <label
      :for="id"
      class="flex items-start justify-center space-x-4 font-bold dark:text-gray-100"
    >
      <input
        :id="id"
        class="w-4 h-4 border-pink-600 mt-[2px] hover:border-pink-700 checked:text-pink-600 focus:ring-pink-600 focus:border-pink-600 focus:outline-none disabled:border-gray-600 disabled:text-gray-600"
        v-bind="{ ...field, ...$attrs }"
        type="radio"
        :disabled="disabled"
        :value="value"
      >
      <span v-if="$slots.default">
        <slot />
      </span>
      <p v-if="!$slots.default">
        {{ label }}
      </p>
    </label>
    <ErrorMessage
      :name="name"
      class="text-red"
    />
  </div>
</Field>
</template>

<script lang="ts" setup>
interface Props {
  disabled?: boolean
  label?: string
  name: string
  value: boolean | string
  id: string
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  isRequired: false,
  label: '',
  name: '',
  id: '',
})
</script>
