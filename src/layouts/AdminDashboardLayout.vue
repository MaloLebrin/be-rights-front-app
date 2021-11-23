<template>
  <AdminMenuDrawer />
  <main class="w-full flex-shrink">
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AdminDashboardLayout',
})
</script>