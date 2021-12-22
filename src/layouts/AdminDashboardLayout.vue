<template>
  <AdminMenuDrawer />
  <main v-bind="$attrs" class="w-full flex-shrink">
    <router-view />
  </main>
  <Teleport to="#portal-target">
    <CreateEventModal
      class="top-32 w-6/12 mx-auto"
      :isActive="getUIState.isActive && getUIState.modalName === ModalNameEnum.EVENT_FORM"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { useUiStore } from "@/store"
import { ModalNameEnum } from "@/store/typesExported";

const uiStore = useUiStore()
const { getUiIsLoading, getUIState } = uiStore

</script>