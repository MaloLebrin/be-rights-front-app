<template>
<div class="sticky top-0 z-10 flex items-center justify-between flex-shrink-0 w-full h-16 bg-white border-b border-gray-200 dark:border-0 dark:bg-gray-800 drop-shadow">
  <div class="flex items-center ml-2 space-x-4">
    <div class="flex flex-col flex-1">
      <div class="sticky top-0 z-10 pt-1 pl-1 lg:hidden sm:pl-3 sm:pt-3">
        <button
          type="button"
          class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          @click="toggleDrawer"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3IconOutline
            class="w-6 h-6"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>

    <a
      class="flex items-center space-x-2 text-gray-500 cursor-pointer dark:text-white-break hover:underline"
      @click="goBack"
    >
      <ChevronLeftIconOutline class="w-5 h-5" />
      <span>Retour</span>
    </a>
    <h3
      v-if="getRouteHeaderContent"
      class="flex items-center space-x-4 text-2xl font-semibold text-gray-800 dark:text-white"
    >
      <component
        :is="getRouteHeaderContent.icon"
        class="h-6 rounded-lg dark:bg-red"
      />
      <span>{{ getRouteHeaderContent.label }}</span>
    </h3>
    <h3
      v-else
      class="flex items-center space-x-4 text-2xl font-semibold text-gray-800 dark:text-white"
    >
      <span>{{ getOutsideMenuRouteLabel }}</span>
    </h3>
  </div>
  <UserMenu
    is-in-header
    class="lg:hidden"
  />
</div>
</template>

<script setup lang="ts">
import { MENU_ITEMS } from '@/helpers/menu'

const router = useRouter()
const route = useRoute()
const { toggleDrawer } = useUiStore()

const getRouteHeaderContent = computed(() =>
  MENU_ITEMS.find(item => item.linkName === route.name),
)

const getOutsideMenuRouteLabel = computed(() => {
  if (route.name) {
    const formatedRouteName = route.name.toString().split('.').splice(1).join('.')

    switch (formatedRouteName) {
      case 'events.show':
        return 'Détail de l\'événement'

      case 'events.edit':
        return 'Modifier l\'événement'

      case 'users.show':
        return 'Détail de l\'utilisateur'

      case 'users.edit':
        return 'Modifier l\'utilisateur'

      case 'employees.details':
        return 'Détail du destinataire'

      case 'account':
        return 'Mon compte'

      case 'account.edit':
        return 'Modifier le compte'

      case 'address.create':
        return 'Ajouter une adresse'
    }
  }
})

function goBack() {
  router.back()
}
</script>
