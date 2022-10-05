<template>
<ContentAdminPageWrapper>
  <EventsEventForm
    :event-id="eventId"
    :mode="ModalModeEnum.EDIT"
  />
</ContentAdminPageWrapper>
</template>

<script setup lang="ts">
import { ModalModeEnum } from '@/types'
import { useAddressStore } from '~~/store'
import { useEventStore } from '~~/store/event'

const { params } = useRoute()

const eventStore = useEventStore()
const addressStore = useAddressStore()
const eventId = computed(() => parseInt(params.eventId as string))
const { fetchEvent } = eventHook()
const { getEmployeesByEventId } = employeeHook()
const { fetchAllForEvent } = fileHook()
const { fetchManyAnswerForEvent } = answerHook()
const { fetchOne: fetchOneAddress } = addressHook()

onMounted(async () => {
  if (!eventStore.isAlreadyInStore(eventId.value)) {
    await fetchEvent(eventId.value)
  }
  await getEmployeesByEventId(eventId.value)
  await fetchAllForEvent(eventId.value)
  await fetchManyAnswerForEvent(eventId.value)
  const event = eventStore.getOne(eventId.value)
  if (event.addressId && !addressStore.isAlreadyInStore(event.addressId)) {
    await fetchOneAddress(event.addressId)
  }
})
definePageMeta({
  layout: 'admin-dashboard-layout',
  isAuth: true,
  isAdmin: true,
})
</script>
