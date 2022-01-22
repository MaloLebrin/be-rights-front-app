<template>
  <div class="fixed grid items-center grid-cols-3 mb-14">
    <h3 class="flex items-center max-w-xs text-2xl font-semibold text-gray-800 dark:text-white mt">
      <slot name="title" />
    </h3>
    <div v-if="withAdditionnalButtons" class="flex items-center justify-center col-span-2">
      <BButton class="mr-2 dark:text-black" @click="setHeaderFilters(null)">Tout</BButton>
      <BButton
        class="mr-2 dark:text-black"
        @click="setHeaderFilters(EventStatusEnum.PENDING)"
      >En cours</BButton>
      <BButton
        class="mr-2 dark:text-black"
        @click="setHeaderFilters(EventStatusEnum.CLOSED)"
      >Terminés</BButton>
      <BInput
        v-model="state.search"
        type="text"
        placeholder="Recherchez"
        @keyup="searchEntity($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTablestore } from '@/store'
import { EventStatusEnum } from '@/store/typesExported'

interface Props {
  withAdditionnalButtons?: boolean
}

withDefaults(defineProps<Props>(), {
  withAdditionnalButtons: true,
})

const state = reactive({
  search: '',
  timeout: 0,
})

const { setSearch, setFilters } = useTablestore()

function searchEntity(event: KeyboardEvent) {
  clearTimeout(state.timeout)
  state.timeout = setTimeout(() => {
    setSearch(state.search)
  }, 500)
}

function setHeaderFilters(filter: string | null) {
  if (filter) {
    setFilters({
      status: filter,
    })
  } else {
    setFilters(null)
  }
}
</script>