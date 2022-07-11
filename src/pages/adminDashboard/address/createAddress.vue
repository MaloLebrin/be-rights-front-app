<template>
<div class="min-h-screen px-8 py-6 text-left transition-all duration-500 ease-in-out transform md:px-20 lg:px-32">
  <AddressForm @submit="submit" />
</div>
</template>

<script setup lang="ts">
import type { AddressTypeCreate } from '@/types'

const route = useRoute()
const { IncLoading, DecLoading } = useUiStore()
const { postOne } = addressHook()
const { redirectBaseOneCurrentUserRole } = userHook()

const isEventCreation = computed(() => route.query.event !== null || route.query.event !== undefined)
const isEmployeeCreation = computed(() => route.query.employee !== null || route.query.employee !== undefined)

async function submit(address: AddressTypeCreate) {
  IncLoading()
  const payload = {
    address,
  }
  if (isEventCreation) {
    const eventId = route.query.event as unknown as number
    payload.eventId = eventId
  }
  if (isEmployeeCreation) {
    const employeeId = route.query.employee as unknown as number
    payload.employeeId = employeeId
  }
  await postOne(payload)
  redirectBaseOneCurrentUserRole()
  DecLoading()
}
</script>
