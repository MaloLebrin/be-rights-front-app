<template>
<div class="flex items-center mt-4 sm:mt-0 sm:ml-16">
  <RadioGroup v-model="filter">
    <RadioGroupLabel class="sr-only">
      Choisissez votre filtre
    </RadioGroupLabel>
    <div class="flex items-center justify-center space-x-2">
      <RadioGroupOption
        v-for="fileType in fileTypeArray"
        :key="fileType"
        as="template"
        :value="fileType"
      >
        <RadioGroupLabel as="div">
          <FileTypeTag
            class="cursor-pointer"
            :type="fileType"
          />
        </RadioGroupLabel>
      </RadioGroupOption>
      <RadioGroupOption
        v-slot="{ active, checked }"
        as="template"
        value=""
      >
        <div
          class="flex items-center justify-center px-2 py-2 text-sm font-medium uppercase border rounded-md cursor-pointer sm:flex-1"
          :class="[active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                   checked ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50']"
        >
          <RadioGroupLabel as="p">
            tout
          </RadioGroupLabel>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
  <!-- FIXME error in console with healdess UI -->
</div>
</template>

<script setup lang="ts">
import type { FileTypeEnum } from '@/types'
import { fileTypeArray } from '@/types'
import { useTableStore } from '~~/store'

const { setFilters } = useTableStore()

const filter = ref<undefined | FileTypeEnum>(undefined)

watch(() => filter.value, newValue => {
  if (newValue) {
    setFilters({
      type: newValue,
    })
  } else {
    setFilters(null)
  }
})
</script>
