<template>
  <header
    class="flex items-center w-full mx-auto shadow-xl md:px-4 md:py-2 max-h-36 dark:bg-blue-dark"
  >
    <nav class="w-full">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="relative items-center hidden m-8 md:flex md:h-16 md:m-0 justify-e">
          <div class="items-center justify-between flex-1 hidden md:flex sm:justify-start">
            <div class="items-center flex-shrink-0 md:flex">
              <router-link to="/">
                <SimpleLogo />
              </router-link>
            </div>
            <div class="ml-auto lg:flex lg:items-stretch lg:justify-end">
              <div class="flex space-x-4">
                <BLink
                  href="#Solution"
                  class="px-3 py-2 text-sm font-medium text-black rounded-md hover:text-white dark:text-white dark:hover:text-red-light"
                >Solutions</BLink>

                <BLink
                  href="#Pricings"
                  class="px-3 py-2 text-sm font-medium text-black rounded-md hover:text-white dark:text-white dark:hover:text-red-light"
                >Tarifs</BLink>

                <BButton href="#Newsletter" variant="white" @click="onClickStartButton">Commencer</BButton>

                <BLink
                  tag="router-link"
                  :to="{ name: 'login' }"
                  class="px-3 py-2 text-sm font-medium text-black rounded-md hover:text-white dark:text-white dark:hover:text-red-light"
                >Se connecter</BLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div class="grid w-full h-full grid-cols-2 gap-4 md:hidden">
        <div class="flex items-center justify-center flex-shrink-0">
          <router-link to="/">
            <div class="w-10 h-10 border-4 rounded-full border-red">
              <div class="w-4 h-4 m-2 rounded-full bg-red-light" />
            </div>
          </router-link>
        </div>

        <Menu as="div" class="relative inline-block text-left md:hidden">
          <div>
            <MenuButton class="inline-flex justify-center w-full">
              <MenuIconOutline class="h-16 text-gray-800 dark:text-gray-100" />
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute right-0 w-56 mt-2 bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-blue-dark_bold ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="px-1 py-1">
                <MenuItem
                  as="li"
                  class="flex items-center w-full px-2 py-2 text-sm rounded-md group"
                >
                  <BLink
                    href="#Solution"
                    class="px-3 py-2 text-sm font-medium text-black rounded-md hover:text-white dark:text-white"
                  >Solutions</BLink>
                </MenuItem>
                <MenuItem
                  as="li"
                  class="flex items-center w-full px-2 py-2 text-sm rounded-md group"
                >
                  <BLink
                    href="#Pricings"
                    class="px-3 py-2 text-sm font-medium text-black rounded-md hover:text-white dark:text-white"
                  >Tarifs</BLink>
                </MenuItem>
                <MenuItem
                  as="li"
                  class="flex items-center w-full px-2 py-2 text-sm rounded-md group"
                >
                  <BLink
                    class="px-3 py-2 text-sm font-medium text-black rounded-md hover:text-white dark:text-white"
                    @click="onClickStartButton"
                  >Commencer</BLink>
                </MenuItem>
                <MenuItem
                  as="li"
                  class="flex items-center w-full px-2 py-2 text-sm rounded-md group"
                >
                  <BLink
                    tag="router-link"
                    :to="{ name: 'login' }"
                    class="px-3 py-2 text-sm font-medium text-black rounded-md hover:text-white dark:text-white"
                  >Se connecter</BLink>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">

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