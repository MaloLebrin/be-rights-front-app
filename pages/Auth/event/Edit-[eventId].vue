<template>
<div class="min-h-screen px-8 py-6 text-left transition-all duration-500 ease-in-out transform md:px-20 lg:px-32">
  <EventsEventForm
    :mode="ModalModeEnum.EDIT"
    :event-id="eventId"
    @submitted="redirectToEvent"
  />
</div>
</template>

<script setup lang="ts">
import { ModalModeEnum } from '@/types'

const { params } = useRoute()
const router = useRouter()
const eventId = computed(() => parseInt(params.eventId as string))

function redirectToEvent() {
  router.push({ name: 'user.events' })
}
definePageMeta({
  layout: 'dashboard-layout',
  isAuth: true,
  isAdmin: true,
})
</script>
