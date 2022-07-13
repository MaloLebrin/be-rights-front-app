<template>
<div class="flex items-center mt-4 sm:mt-0 sm:ml-16">
  <RadioGroup v-model="filter">
    <RadioGroupLabel class="sr-only">
      Choisissez votre filtre
    </RadioGroupLabel>
    <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
      <RadioGroupOption
        v-for="status in eventStatusArray"
        :key="status"
        as="div"
        :name="status"
        :value="status"
      >
        <RadioGroupLabel
          as="label"
          class="cursor-pointer"
        >
          <EventStatusTag :status="status" />
        </RadioGroupLabel>
      </RadioGroupOption>
      <RadioGroupOption
        v-slot="{ active, checked }"
        as="div"
        :name="null"
        value=""
      >
        <div
          :class="['cursor-pointer focus:outline-none',
                   active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                   checked ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                   'border rounded-md py-2 px-2 flex items-center justify-center text-sm font-medium uppercase sm:flex-1']"
        >
          <RadioGroupLabel as="label">
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
import type { EventStatusEnum } from '@/types'
import { eventStatusArray } from '@/types'

const { setFilters } = useTableStore()

const filter = ref<undefined | EventStatusEnum>(undefined)

watch(() => filter.value, newValue => {
  if (newValue) {
    setFilters({
      status: newValue,
    })
  } else {
    setFilters(null)
  }
})
</script>
