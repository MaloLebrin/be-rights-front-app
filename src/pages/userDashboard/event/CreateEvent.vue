<template>
  <div
    class="relative min-h-screen px-8 py-6 text-left transition-all duration-500 ease-in-out transform md:px-20 lg:px-32">
    <div class="flex items-center">
      <CalendarIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />
      <h1 class="flex items-center max-w-xs text-2xl font-semibold text-gray-800 dark:text-white mt">Créer un Èvénement
      </h1>
    </div>

    <EventForm :mode="ModalModeEnum.CREATE" @submitted="redirectToEvent" />
  </div>
</template>

<script lang="ts" setup>
import { ModalModeEnum } from '@/types/typesExported'

const router = useRouter()

function redirectToEvent() {
  router.push({ name: 'user.events' })
}
</script>
