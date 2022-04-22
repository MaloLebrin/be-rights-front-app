<template>
<div class="shadow-xl">
  <TransitionRoot
    as="template"
    :show="isDrawerOpen"
  >
    <Dialog
      as="div"
      class="fixed inset-0 z-40 flex md:hidden"
      @close="toggleDrawer(false)"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </TransitionChild>
      <TransitionChild
        as="template"
        enter="transition ease-in-out duration-300 transform"
        enter-from="-translate-x-full"
        enter-to="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leave-from="translate-x-0"
        leave-to="-translate-x-full"
      >
        <div class="relative flex flex-col flex-1 w-full max-w-xs bg-gray-800">
          <TransitionChild
            as="template"
            enter="ease-in-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in-out duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="absolute top-0 right-0 pt-2 -mr-12">
              <button
                type="button"
                class="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                @click="toggleDrawer(false)"
              >
                <span class="sr-only">Close sidebar</span>
                <XIconOutline
                  class="w-6 h-6 text-white"
                  aria-hidden="true"
                />
              </button>
            </div>
          </TransitionChild>
          <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div class="flex items-center flex-shrink-0 px-4">
              <SimpleLogo />
            </div>
            <nav class="px-2 mt-5 space-y-1">
              <router-link
                v-for="(item, index) in getMenuItems()"
                :key="index"
                v-slot="{ isExactActive }"
                :to="{ name: item.linkName }"
              >
                <div
                  :class="[isExactActive ? 'bg-gray-900 text-white' : 'dark:text-gray-300 text-gray-600 hover:bg-gray-700 hover:text-white', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']"
                >
                  <component
                    :is="item.icon"
                    :class="[isExactActive ? 'text-gray-300' : 'dark:text-gray-400 text-gray-600 group-hover:text-gray-300', 'mr-3 flex-shrink-0 h-6 w-6']"
                    aria-hidden="true"
                  />
                  {{ item.label }}
                </div>
              </router-link>
            </nav>
          </div>
          <div
            v-if="userStore.getCurrent"
            class="flex flex-shrink-0 p-4 bg-gray-700"
          >
            <a
              href="#"
              class="flex-shrink-0 block group"
            >
              <div class="flex items-center">
                <UserAvatar :user="userStore.getCurrent" />
                <div class="ml-3">
                  <p class="text-base font-medium text-white">{{ userStore.getUserFullName }}</p>
                  <p class="text-sm font-medium text-gray-400 group-hover:text-gray-300">Voir le profile</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </TransitionChild>
      <div class="flex-shrink-0 w-14">
        <!-- Force sidebar to shrink to fit close icon -->
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Static sidebar for desktop -->
  <div
    class="hidden px-4 bg-white shadow-xl dark:bg-gray-800 md:flex md:w-64 lg:w-72 md:flex-col md:fixed md:inset-y-0"
  >
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex flex-col flex-1 w-full min-h-0 space-y-4">
      <div class="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
        <div class="flex items-center flex-shrink-0 px-4">
          <SimpleLogo />
        </div>
        <nav class="flex-1 mt-5 space-y-4">
          <router-link
            v-for="(item, index) in getMenuItems()"
            :key="index"
            v-slot="{ isExactActive }"
            :to="{ name: item.linkName }"
          >
            <div
              :class="[isExactActive ? 'bg-gray-900 text-white' : 'dark:text-gray-300 text-gray-600 hover:bg-gray-700 hover:text-white', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']"
            >
              <component
                :is="item.icon"
                :class="[isExactActive ? 'text-gray-300' : 'dark:text-gray-400 text-gray-600 group-hover:text-gray-300', 'mr-3 flex-shrink-0 h-6 w-6']"
                aria-hidden="true"
              />
              {{ item.label }}
            </div>
          </router-link>
        </nav>
      </div>
      <DarkModeToggle />
      <Menu
        as="div"
        class="relative ml-3"
      >
        <div>
          <MenuButton
            v-if="userStore.getCurrent"
            class="flex items-center flex-shrink-0 p-4"
          >
            <UserAvatar :user="userStore.getCurrent" />
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-600 dark:text-white">
                {{ userStore.getUserFullName }}
              </p>
            </div>
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
            class="absolute w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg -top-24 ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <MenuItem v-slot="{ active }">
              <router-link
                :to="{ name: userStore.isCurrentUserAdmin ? 'admin.users.show' : 'user.account', params: { userId: userStore.getCurrentUserId } }"
                :class="['flex items-center space-x-2 justify-start', active ? 'bg-gray-100' : '', 'px-4 py-2 text-sm text-gray-700']"
              >
                <UserCircleIconOutline class="h-6 text-gray-500" />
                <span>Voir le profile</span>
              </router-link>
            </MenuItem>

            <MenuButton>
              <div
                class="flex items-center justify-start w-full space-x-2 text-sm text-gray-700 cursor-pointer"
                @click="onToggleLogout"
              >
                <LogoutIconOutline class="h-6 text-gray-500" />
                <router-link :to="{ name: 'home' }">
                  Se déconnecter
                </router-link>
              </div>
            </MenuButton>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
  <div class="flex flex-col flex-1 md:pl-64">
    <div class="sticky top-0 z-10 pt-1 pl-1 bg-gray-100 md:hidden sm:pl-3 sm:pt-3">
      <button
        type="button"
        class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        @click="toggleDrawer(true)"
      >
        <span class="sr-only">Open sidebar</span>
        <MenuIconOutline
          class="w-6 h-6"
          aria-hidden="true"
        />
      </button>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { useCookies } from 'vue3-cookies'
import { MENU_ITEMS } from '@/helpers/menu'

const userStore = useUserStore()
const uiStore = useUiStore()
const { toggleDrawer } = useUiStore()
const { logout } = authHook()

const { cookies } = useCookies()

function onToggleLogout() {
  cookies.remove('userToken')
  logout()
}

const isDrawerOpen = ref(false)

watch(() => uiStore.isDrawerOpen, val => {
  isDrawerOpen.value = val
})

function getMenuItems() {
  if (userStore.isCurrentUserAdmin) {
    return MENU_ITEMS.filter(item => item.isAdmin)
  }
  return MENU_ITEMS.filter(item => !item.isAdmin)
}
</script>
