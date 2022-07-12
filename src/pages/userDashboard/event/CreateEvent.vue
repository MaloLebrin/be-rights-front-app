<template>
<div
  class="relative min-h-screen py-6 text-left transition-all duration-500 ease-in-out transform"
>
  <div
    class="px-4 py-8 xl:px-48 lg:px-48 md:px-32"
  >
    <EventForm
      :mode="
        ModalModeEnum.CREATE"
      @submitted="redirectToEvent"
    />
  </div>
</div>
</template>

<script lang="ts" setup>
import { ModalModeEnum } from '@/types'

const router = useRouter()

function redirectToEvent() {
  router.push({ name: 'user.events' })
}
</script>
