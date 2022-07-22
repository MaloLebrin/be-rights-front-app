<template>
<AdminPageWrapper>
  <EventForm
    :event-id="eventId"
    :mode="ModalModeEnum.EDIT"
  />
</AdminPageWrapper>
</template>

<script setup lang="ts">
import { ModalModeEnum } from '@/types'
const { params } = useRoute()

const eventStore = useEventStore()
const eventId = computed(() => parseInt(params.eventId as string))
const { fetchEvent } = eventHook()
const { getEmployeesByEventId } = employeeHook()
const { fetchAllForEvent } = fileHook()
const { fetchManyAnswerForEvent } = answerHook()

onMounted(async() => {
  if (!eventStore.isAlreadyInStore(eventId.value)) {
    await fetchEvent(eventId.value)
  }
  await getEmployeesByEventId(eventId.value)
  await fetchAllForEvent(eventId.value)
  await fetchManyAnswerForEvent(eventId.value)
})
</script>
