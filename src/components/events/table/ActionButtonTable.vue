<template>
<Menu
  as="div"
  class="relative inline-block text-left"
>
  <div>
    <MenuButton
      class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-purple-500 bg-purple-300 border border-purple-500 rounded-md bg-opacity-20 hover:bg-opacity-40 hover:text-purple-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      Options
      <ChevronDownIconSolid
        class="w-5 h-5 ml-2 -mr-1 text-purple-500 hover:text-purple-800"
        aria-hidden="true"
      />
    </MenuButton>
  </div>

  <transition
    enter-active-class="transition duration-100 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <MenuItems
      class="absolute right-0 z-10 w-56 mt-2 overflow-visible origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      <div class="px-1 py-1">
        <MenuItem v-slot="{ active }">
          <button
            class="flex items-center w-full px-2 py-2 text-sm rounded-md group"
            :class="[
              active ? 'bg-purple-300 text-purple-800' : 'text-gray-900',
            ]"
            @click="updateOneEvent"
          >
            <PencilSquareIconOutline
              :active="active"
              class="w-5 h-5 mr-2 text-violet-400"
              aria-hidden="true"
            />
            Voir / Modifier
          </button>
        </MenuItem>
      </div>
      <!-- <div class="px-1 py-1">
        <MenuItem v-slot="{ active }">
          <button
            :class="[
              active ? 'bg-purple-300 text-purple-800' : 'text-gray-900',
              'group flex rounded-md items-center w-full px-2 py-2 text-sm',
            ]"
            @click="addEmployeeToEvent"
          >
            <PlusCircleIconOutline
              :active="active"
              class="w-5 h-5 mr-2 text-violet-400"
              aria-hidden="true"
            />
            Ajouter un destinataire
          </button>
        </MenuItem>
      </div> -->
      <!-- TODO find UI-UX and code way to add existing or new Employee to event -->
      <div class="px-1 py-1">
        <MenuItem v-slot="{ active }">
          <button
            class="flex items-center w-full px-2 py-2 text-sm rounded-md group"
            :class="[
              active ? 'bg-purple-300 text-purple-800' : 'text-gray-900',
            ]"
            @click="deleteEvent"
          >
            <TrashIconOutline
              :active="active"
              class="w-5 h-5 mr-2 text-violet-400"
              aria-hidden="true"
            />
            Delete
          </button>
        </MenuItem>
      </div>
    </MenuItems>
  </transition>
</Menu>
</template>

<script setup lang="ts">
import type { EventType } from '@/types'
import { ModalModeEnum, ModalNameEnum } from '@/types'

interface Props {
  event: EventType
}

const props = defineProps<Props>()

const uiStore = useUiStore()
const { setUiModal } = uiStore
const userStore = useUserStore()
const router = useRouter()

function updateOneEvent() {
  if (userStore.isCurrentUserAdmin) {
    router.push({ name: 'admin.events.show', params: { eventId: props.event.id } })
  } else {
    router.push({ name: 'user.events.show', params: { eventId: props.event.id } })
  }
}

// function addEmployeeToEvent() {
//   setUiModal({
//     isActive: true,
//     modalName: ModalNameEnum.ADD_EMPLOYEE,
//     modalMode: ModalModeEnum.CREATE,
//     data: {
//       eventId: props.event.id,
//     },
//   })
// }

function deleteEvent() {
  setUiModal({
    isActive: true,
    modalName: ModalNameEnum.EVENT_FORM,
    modalMode: ModalModeEnum.DELETE,
    data: {
      event: props.event,
    },
  })
}
</script>
