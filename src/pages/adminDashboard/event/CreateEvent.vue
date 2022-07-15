<template>
<AdminPageWrapper>
  <EventCreationStepper />
  <EventForm
    :mode="ModalModeEnum.CREATE"
  />
</AdminPageWrapper>
</template>

<script setup lang="ts">
import { ModalModeEnum } from '@/types'
</script>
