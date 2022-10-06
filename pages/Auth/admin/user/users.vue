<template>
<div
  class="relative h-full px-4 py-6 text-left transition-all duration-500 ease-in-out transform"
>
  <UsersTableUserList :users="users" />
</div>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router'
import { useTableStore, useUiStore, useUserStore } from '~~/store'

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

onMounted(async () => {
  IncLoading()
  await fetchAll(tableStore.getFinalUrl)
  DecLoading()
})
definePageMeta({
  layout: 'admin-dashboard-layout',
  isAuth: true,
  isAdmin: true,
})
</script>
