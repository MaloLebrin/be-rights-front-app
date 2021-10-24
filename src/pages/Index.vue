<template>
  <Header />
  <router-link :to="{ name: 'login'}">to login</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  setup() {
  },
})
</script>
