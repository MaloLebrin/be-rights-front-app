<template>
<div
  class="relative min-h-screen px-4 py-6 text-left transition-all duration-500 ease-in-out transform"
>
  <UserList :users="users" />
</div>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router'

const { fetchAll } = userHook()
const { IncLoading, DecLoading } = useUiStore()
const tableStore = useTableStore()
const userStore = useUserStore()
const { setFilters } = useTableStore()

onBeforeRouteLeave(() => {
  setFilters(null)
})

const users = computed(() => userStore.getAllArray)

watch(() => tableStore.getFinalUrl, async newValue => {
  IncLoading()
  userStore.resetState()
  await fetchAll(newValue)
  DecLoading()
})

onMounted(async() => {
  IncLoading()
  await fetchAll(tableStore.getFinalUrl)
  DecLoading()
})
</script>
