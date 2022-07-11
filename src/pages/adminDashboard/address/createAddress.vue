<template>
<div class="min-h-screen px-8 py-6 text-left transition-all duration-500 ease-in-out transform md:px-20 lg:px-32">
  <AddressForm @submit="submit" />
</div>
</template>

<script setup lang="ts">
import type { AddressPostPayload, AddressTypeCreate } from '@/types'

const route = useRoute()
const router = useRouter()
const { IncLoading, DecLoading } = useUiStore()
const userStore = useUserStore()
const { postOne } = addressHook()
const { redirectBaseOneCurrentUserRole } = userHook()

const isEventCreation = computed(() => route.query.event !== null || route.query.event !== undefined)
const isEmployeeCreation = computed(() => route.query.employee !== null || route.query.employee !== undefined)

async function submit(address: AddressTypeCreate) {
  IncLoading()
  const payload: AddressPostPayload = {
    address,
  }
  if (isEventCreation.value) {
    const eventId = route.query.event as unknown as number
    payload.eventId = eventId
  }
  if (isEmployeeCreation.value) {
    const employeeId = route.query.employee as unknown as number
    payload.employeeId = employeeId
  }
  await postOne(payload)
  if (isEventCreation) {
    redirectBaseOneCurrentUserRole()
  }
  if (isEmployeeCreation.value) {
    router.push({
      name: userStore.isCurrentUserAdmin ? 'admin.employees' : 'user.employees',
    })
  }
  DecLoading()
}
</script>
