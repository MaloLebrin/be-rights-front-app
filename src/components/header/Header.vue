<template>
  <header class="container flex justify-between items-center max-h-32 w-full my-2">
    <img
      class="object-cover overflow-hidden max-w-xs  w-60"
      src="../../assets/logoShot.png"
      alt="logo be right"
    />
    <nav class="">
      <ul class="flex flex-row-reverse justify-between items-center">
        <li
          v-for="route in routes"
          :key="route.name"
        >
          <BButton
            v-if="route.name === 'login'"
            class="rounded-full px-6 py-3"
          >
            {{ route.name }}
          </BButton>
          <BLink
            :label="route.name"
            v-else
          >
            {{ route.name }}
          </BLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import routes from 'virtual:generated-pages'

export default defineComponent({
  name: 'Header',
  setup() {
    return {
      routes,
    }
  },
})
</script>