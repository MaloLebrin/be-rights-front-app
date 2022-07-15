<template>
<div class="shadow-xl">
  <TransitionRoot
    as="template"
    :show="uiStore.getIsDrawerOpen"
  >
    <Dialog
      as="div"
      class="fixed inset-0 z-40 flex lg:hidden"
      @close="closeDrawer"
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
                @click="closeDrawer"
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
              <SimpleLogo class="text-white" />
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
            class="flex flex-shrink-0 p-4"
          >
            <UserMenu />
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
    class="hidden px-4 bg-white shadow-xl dark:bg-gray-800 lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0"
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
      <!-- <DarkModeToggle /> -->
      <UserMenu />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { MENU_ITEMS } from '@/helpers/menu'

const userStore = useUserStore()
const uiStore = useUiStore()
const { closeDrawer } = uiStore

function getMenuItems() {
  if (userStore.isCurrentUserAdmin) {
    return MENU_ITEMS.filter(item => item.isAdmin)
  }
  return MENU_ITEMS.filter(item => !item.isAdmin)
}
</script>
