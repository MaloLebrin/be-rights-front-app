<template>
<div class="flex items-center mt-4 sm:mt-0 sm:ml-16">
  <RadioGroup v-model="filter">
    <RadioGroupLabel class="sr-only">
      Choisissez votre filtre
    </RadioGroupLabel>
    <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
      <RadioGroupOption
        v-for="subscription in subscriptionArray"
        :key="subscription"
        as="div"
        :name="subscription"
        :value="subscription"
      >
        <RadioGroupLabel
          as="label"
          class="cursor-pointer"
        >
          <UsersUserSubscriptionTag :subscription="subscription" />
        </RadioGroupLabel>
      </RadioGroupOption>
      <RadioGroupOption
        v-slot="{ active, checked }"
        as="div"
        :name="null"
        value=""
      >
        <div
          class="flex items-center justify-center px-2 py-2 text-sm font-medium border rounded-md cursor-pointer focus:outline-none sm:flex-1"
          :class="[active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                   checked ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50']"
        >
          <RadioGroupLabel as="label">
            Tout
          </RadioGroupLabel>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</div>
</template>

<script setup lang="ts">
import type { SubscriptionEnum } from '@/types'
import { subscriptionArray } from '@/types'
import { useTableStore } from '~~/store'

const { setFilters } = useTableStore()

const filter = ref<undefined | SubscriptionEnum>(undefined)

watch(() => filter.value, newValue => {
  if (newValue) {
    setFilters({
      subscription: newValue,
    })
  } else {
    setFilters(null)
  }
})
</script>
