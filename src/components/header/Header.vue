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
              <router-link
                :to="{ path: '/' }"
                class="px-3 py-2 text-sm font-medium rounded-md text-blue dark:text-white dark:hover:text-red-light hover:text-red-light"
              >
                Solutions
              </router-link>

              <router-link
                :to="{ path: '/' }"
                class="px-3 py-2 text-sm font-medium rounded-md text-blue dark:text-white dark:hover:text-red-light hover:text-red-light"
              >
                Tarifs
              </router-link>

              <BaseButton
                :href="getButtonPath"
                @click="onClickStartButton"
              >
                {{ userStore.entities.current ? 'Mon compte' : 'Commencer' }}
              </BaseButton>

              <router-link
                v-if="!userStore.entities.current"
                :to="{ name: 'login' }"
                class="px-3 py-2 text-sm font-medium rounded-md text-blue dark:text-white dark:hover:text-red-light hover:text-red-light"
              >
                Se connecter
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="grid w-full h-full grid-cols-2 gap-4 md:hidden">
      <router-link
        class="flex items-center justify-center flex-shrink-0 space-x-2"
        to="/"
      >
        <div class="w-10 h-10 border-4 rounded-full border-red">
          <div class="w-4 h-4 m-2 rounded-full bg-red-light" />
        </div>
        <h1 class="text-xl font-bold">
          Be Right
        </h1>
      </router-link>

      <Menu
        as="div"
        class="relative inline-block text-left md:hidden"
      >
        <div>
          <MenuButton class="inline-flex justify-center w-full">
            <Bars3IconOutline class="h-16 text-gray-800 dark:text-gray-100" />
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
                <router-link
                  :to="{ path: '/' }"
                  class="px-3 py-2 text-sm font-medium text-black rounded-md hover:text-white dark:text-white"
                >
                  Solutions
                </router-link>
              </MenuItem>
              <MenuItem
                as="li"
                class="flex items-center w-full px-2 py-2 text-sm rounded-md group"
              >
                <router-link
                  :to="{ path: '/' }"
                  class="px-3 py-2 text-sm font-medium text-black rounded-md hover:text-white dark:text-white"
                >
                  Tarifs
                </router-link>
              </MenuItem>
              <MenuItem
                as="li"
                class="flex items-center w-full px-2 py-2 text-sm rounded-md group"
              >
                <BaseButton
                  :href="getButtonPath"
                  @click="onClickStartButton"
                >
                  {{ userStore.isLoggedIn ? 'Mon compte' : 'Commencer' }}
                </BaseButton>
              </MenuItem>
              <MenuItem
                v-if="!userStore.isLoggedIn"
                as="li"
                class="flex items-center w-full px-2 py-2 text-sm rounded-md group"
              >
                <router-link
                  :to="{ name: 'login' }"
                  class="px-3 py-2 text-sm font-medium text-black rounded-md hover:text-white dark:text-white"
                >
                  Se connecter
                </router-link>
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
const emit = defineEmits<{
  (e: 'startNow'): void
}>()

const userStore = useUserStore()

const getButtonPath = computed(() => {
  if (!userStore.entities.current) {
    return { name: 'register' }
  }
  if (userStore.isCurrentUserAdmin) {
    return { name: 'admin.events' }
  } else {
    return { name: 'user.events' }
  }
})

function onClickStartButton() {
  emit('startNow')
}
</script>
