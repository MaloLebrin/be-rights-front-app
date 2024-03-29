<template>
<Field
  v-slot="{ field, meta, errors, handleChange, handleBlur }"
  as="div"
  :name="name"
  :class="`flex flex-col w-full space-y-4 ${wrapperClasses}`"
>
  <label
    v-if="label"
    class="block text-sm font-bold text-blue dark:text-gray-100"
    :for="name"
  >
    <!-- Don't insert a line break here, would add a space between the label and the * that we don't want -->
    {{ label }}<span v-if="isRequired">*</span>
  </label>
  <div class="relative">
    <input
      v-bind="{ ...field, ...$attrs }"
      :id="name"
      :disabled="disabled"
      :aria-disabled="disabled"
      :placeholder="placeholder"
      :aria-placeholder="placeholder"
      :name="name"
      :type="computedInputType"
      class="appearance-none block shadow-md py-2 px-4 border focus:ring-purple-500 focus:border-purple-500 w-full sm:text-sm border-gray-300 rounded-md text-gray-800"
      :class="[{ 'border-red-300': errors?.length },
               { 'cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-200': disabled },
               getBorderClasses(errors, meta),
      ]"
      @input="handleChange"
      @blur="handleBlur"
    >
    <div class="absolute inset-y-0 right-0 flex items-center pr-4 space-x-2">
      <XCircleIconSolid
        v-if="errors.length > 0"
        class="w-6 h-6 text-red"
      />
      <CheckCircleIconSolid
        v-else-if="meta.dirty && meta.valid"
        class="w-6 h-6 text-green"
      />
      <button
        v-if="type === 'password'"
        type="button"
        class="text-gray-600 border-2 border-transparent focus:outline-none focus:border-pink-600"
        @click.prevent="onPasswordVisibilityToggle"
      >
        <EyeSlashIconOutline
          v-if="isPasswordVisible"
          class="w-6 h-6"
        />
        <EyeIconOutline
          v-else
          class="w-6 h-6"
        />
      </button>
    </div>
  </div>
  <ErrorMessage
    :name="name"
    class="text-sm text-red"
  />
</Field>
</template>

<script setup lang="ts">
import type { FieldMeta } from 'vee-validate'

interface Props {
  disabled?: boolean
  isRequired?: boolean
  label?: string
  name: string
  placeholder?: string
  wrapperClasses?: string
  type?: 'email' | 'password' | 'search' | 'text' | 'tel' | 'url' | 'date'
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  isRequired: false,
  label: '',
  name: '',
  placeholder: '',
  wrapperClasses: '',
  type: 'text',
})

const isPasswordVisible = ref(false)

const computedInputType = computed(() => {
  if (props.type === 'password') {
    return isPasswordVisible.value ? 'text' : 'password'
  }
  return props.type
})

function getBorderClasses(errors: string[], meta: FieldMeta<unknown>) {
  if (errors.length > 0) {
    return 'border-red'
  }

  // Only set success if the field has been blured
  if (meta.dirty && meta.valid) {
    return 'border-green'
  }

  return 'border-gray-400'
}

function onPasswordVisibilityToggle() {
  isPasswordVisible.value = !isPasswordVisible.value
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
