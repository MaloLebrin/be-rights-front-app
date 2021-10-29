<template>
  <header class="flex items-center max-h-36 w-full my-2 mx-auto">
    <nav class="w-full">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative m-8 md:m-0 flex items-center justify-e h-16">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <button
              type="button"
              class="bg red inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              @click="toggleMobileMenu"
            >
              <span class="sr-only">Menu</span>
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
            <div class="flex-shrink-0 flex items-center">
              <img
                class="hidden lg:block w-56 object-cover overflow-hidden mr-16"
                src="../../assets/logoShot.png"
                alt="logo be right"
              />

            </div>
            <div class="lg:flex lg:items-stretch lg:justify-end ml-auto">
              <div class="flex space-x-4">
                <BLink
                  href="#"
                  class="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Solutions</BLink>

                <BLink
                  href="#"
                  class="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Tarifs</BLink>

                <BButton
                  href="#"
                  class="text-black hover:bg-gray-700 hover:border-white hover:border-1 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Commencer
                </BButton>

                <BLink
                  tag='router-link'
                  :to="{ name: 'login'}"
                  class="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Se connecter
                </BLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div
        v-if="isMenuOpen"
        class="sm:hidden bg-white z-50"
        id="mobile-menu"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#"
            class="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Solutions</a>

          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Tarifs</a>

          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Commencer</a>
          <div class="flex items-center justify-center w-full cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">
            <UserIcon class="w-8" />
            <BLink
              tag='router-link'
              :to="{ name: 'login'}"
            >
              Se connecter
            </BLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { UserIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'Header',
  components: {
    UserIcon,
  },
  setup() {
    const isMenuOpen = ref(false)
    function toggleMobileMenu() {
      isMenuOpen.value = !isMenuOpen.value
    }

    return {
      isMenuOpen,
      toggleMobileMenu,
    }
  }
})
</script>