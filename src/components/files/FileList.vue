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
    <!-- <FiltersFilesTable /> -->
  </div>
  <div class="flex flex-col h-full mt-8">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <HeaderFileTable />
            </thead>
            <template v-if="files.length > 0">
              <tbody class="bg-white divide-y divide-gray-200">
                <FileTableItem
                  v-for="file in files"
                  :key="file.id"
                  :file="file"
                />
              </tbody>
            </template>
            <div
              v-else
              class="flex items-center py-4 pl-4 pr-3 space-x-2 text-sm font-medium text-gray-900 truncate whitespace-nowrap sm:pl-6"
            >
              <p>{{ userStore.isCurrentUserAdmin ? 'Aucun fichier en base de donnée' : 'Vous n\'avez aucun fichier' }}</p>
              <BaseButton :href="{ name: userStore.isCurrentUserAdmin ? 'admin.files.create' : 'user.files.create-model' }">
                Créer un fichier
              </BaseButton>
            </div>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import type { FileType } from '@/types'

interface Props {
  files: FileType[]
}

withDefaults(defineProps<Props>(), {
  files: () => [],
})

const userStore = useUserStore()
const { setSearch } = useTableStore()

const state = reactive({
  search: '',
  timeout: 0,
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function searchEntity(event: KeyboardEvent) {
  clearTimeout(state.timeout)
  state.timeout = window.setTimeout(() => {
    setSearch(state.search)
  }, 500)
}
</script>

<style>
.EventActionButton {
  @apply bg-gray-500 rounded mb-1 py-2 px-4 text-gray-200 font-semibold hover:translate-x-3 transform transition-all duration-500
dark:bg-white-break dark:text-gray-900 cursor-pointer;
}
</style>
