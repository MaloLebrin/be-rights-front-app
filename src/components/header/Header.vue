<template>
  <header class="flex items-center max-h-36 w-full px-4 py-2 mx-auto dark:bg-blue-dark">
    <nav class="w-full">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative m-8 md:m-0 flex items-center justify-e h-16">
          <div class="flex items-center sm:hidden">
            <button @click="toggleMobileMenu">
              <svg
                v-if="isMenuOpen"
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                v-else
                class="bg-red h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="hidden md:flex flex-1 items-center justify-between sm:justify-start">
            <div class="flex-shrink-0 :mdflex items-center">
              <router-link to="/">
                <SimpleLogo />
                <!-- <img
                  class="md:block w-56 object-cover overflow-hidden mr-16"
                  src="../../assets/logoShot.png"
                  alt="logo be right"
                />-->
              </router-link>
            </div>
            <div class="lg:flex lg:items-stretch lg:justify-end ml-auto">
              <div class="flex space-x-4">
                <BLink
                  href="#Solution"
                  class="text-black hover:text-white dark:text-white dark:hover:text-red-light px-3 py-2 rounded-md text-sm font-medium"
                >Solutions</BLink>

                <BLink
                  href="#Pricings"
                  class="text-black hover:text-white dark:text-white dark:hover:text-red-light px-3 py-2 rounded-md text-sm font-medium"
                >Tarifs</BLink>

                <BButton href="#Newsletter" variant="white" @click="onClickStartButton">Commencer</BButton>

                <BLink
                  tag="router-link"
                  :to="{ name: 'login' }"
                  class="text-black hover:text-white dark:text-white dark:hover:text-red-light px-3 py-2 rounded-md text-sm font-medium"
                >Se connecter</BLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div v-if="isMenuOpen" class="flex flex-col sm:hidden" id="mobile-menu">
        <div class="flex flex-col space-x-4">
          <BLink
            href="#Solution"
            class="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >Solutions</BLink>

          <BLink
            href="#Pricings"
            class="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >Tarifs</BLink>

          <BLink
            href="#Newsletter"
            class="text-black hover:bg-gray-700 hover:border-white hover:border-1 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            @click="onClickStartButton"
          >Commencer</BLink>

          <BLink
            tag="router-link"
            :to="{ name: 'login' }"
            class="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >Se connecter</BLink>
        </div>
      </div>
    </nav>
  </header>
</template>
<script setup lang='ts'>
import { UserIcon } from '@heroicons/vue/outline'

const isMenuOpen = ref<boolean>(false)
function toggleMobileMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

const emit = defineEmits<{
  (e: 'startNow'): void
}>()

function onClickStartButton() {
  emit('startNow')
}
</script>