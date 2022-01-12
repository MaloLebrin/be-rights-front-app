<template>
  <div class="text-black dark:bg-blue-dark dark:text-white min-h-screen">as user</div>
</template>

<route>
{meta: {
  layout: "DashboardLayout"
}
}
</route>

<script setup lang="ts">
import { useEventStore, useUiStore, useUserStore } from '@/store/index'
import { LoaderTypeEnum } from '@/types/globals'
import { eventHook } from '@/hooks'
import { ModalNameEnum, ModalModeEnum } from '@/store/typesExported'

const eventStore = useEventStore()
const uiStore = useUiStore()
const userStore = useUserStore()
const { getCurrent } = useUserStore()
const { setUiModal } = uiStore
const { fetchEventsByUser } = eventHook()
const search = ref('')
const isLoading = ref(false)
const events = computed(() => Object.values(eventStore.entities.byId))

onMounted(async () => {
  console.log(getCurrent, 'getCurrent')
  isLoading.value = true
  await fetchEventsByUser(getCurrent!?.id)
  isLoading.value = false
})
</script>