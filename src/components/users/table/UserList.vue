<template>
<div class="h-full px-4 sm:px-6 lg:px-8">
  <div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
      <BaseInput
        v-model="state.search"
        type="text"
        placeholder="Recherchez"
        @keyup="searchEntity($event)"
      />
    </div>
    <FiltersUserTable />
  </div>
  <div class="flex flex-col h-full mt-8">
    <div class="h-full -mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block h-full min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div class="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table class="min-w-full overflow-visible divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <HeaderUserTable />
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <template v-if="users.length > 0">
                <UserItemTable
                  v-for="user in users"
                  :key="user.id"
                  :user="user"
                />
              </template>
              <p
                v-else
                class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 truncate whitespace-nowrap sm:pl-6"
              >
                Aucun utilisateur en base de donnée
              </p>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import type { UserType } from '@/types/typesExported'
import { ModalModeEnum, ModalNameEnum } from '@/types/typesExported'

interface Props {
  users: UserType[]
}

withDefaults(defineProps<Props>(), {
  users: () => [],
})

const { setSearch } = useTableStore()
const uiStore = useUiStore()
const { setUiModal } = uiStore

const state = reactive({
  search: '',
  timeout: 0,
})

function onToggleUsersModal(user: UserType) {
  setUiModal({
    isActive: true,
    modalName: ModalNameEnum.USER_ADMIN,
    modalMode: ModalModeEnum.DELETE,
    data: {
      user,
    },
  })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function searchEntity(event: KeyboardEvent) {
  clearTimeout(state.timeout)
  state.timeout = window.setTimeout(() => {
    setSearch(state.search)
  }, 500)
}
</script>
