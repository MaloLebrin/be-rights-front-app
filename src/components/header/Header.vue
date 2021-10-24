<template>
  <header class="flex justify-items-end items-center max-h-32 w-full my-2">
    <nav class="w-full">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-e h-16">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <button
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="sr-only">Menu</span>
              <!--
            Icon when menu is closed.

            Heroicon name: outline/menu

            Menu open: "hidden", Menu closed: "block"
          -->
              <svg
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
              <!--
            Icon when menu is open.

            Heroicon name: outline/x

            Menu open: "block", Menu closed: "hidden"
          -->
              <svg
                class="hidden h-6 w-6"
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
          <div class="flex-1 flex items-center justify-between sm:justify-start">
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
        class="sm:hidden"
        id="mobile-menu"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <!-- Current: "bg-gray-900 text-white", Default: "text-black hover:bg-gray-700 hover:text-white" -->
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
import { defineComponent } from 'vue'
import { UserIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'Header',
  components: {
    UserIcon,
  },
})
</script>