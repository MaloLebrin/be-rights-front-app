<template>
<div :id="`InputSearchSelect${baseUrl}`">
  <div
    v-if="state.selectedItems.length > 0"
    class="grid grid-cols-5 gap-4 mb-4"
  >
    <Tag
      v-for="item in state.selectedItems"
      :key="item.id"
      :variant="TagVariantsEnum.PURPLE"
      @close="removeItem(item.id)"
    >
      {{ item.firstName }} {{ item.lastName }}
    </Tag>
  </div>
  <div class="relative">
    <BaseInput
      id="search"
      v-model="state.search"
      type="text"
      @keyup="searchEntity($event)"
    />
    <ProcessingIcon v-if="state.isLoading" />
    <SearchIconOutline
      v-else
      class="absolute w-5 h-5 text-blue top-4 right-3"
    />
  </div>
  <div
    v-if="state.data.length > 0"
    class="relative w-full overflow-y-auto text-sm text-gray-700 bg-white border border-gray-400 shadow-inner cursor-pointer dark:border-indigo-100 max-h-48"
    :tabindex="0"
  >
    <div
      v-for="item in state.data"
      :key="item.id"
      class="flex items-center justify-between px-4 py-2 hover:bg-gray-600 hover:text-white"
      @click="onOptionClick(item)"
    >
      <span>{{ item.firstName }} {{ item.lastName }}</span>
      <CheckIconOutline
        v-if="state.selectedItems.includes(item)"
        class="w-6 h-6 text-green"
      />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import type { PaginatedResponse } from '@/helpers/api'
import APi from '@/helpers/api'
import type { EmployeeType } from '@/types/typesExported'
import { TagVariantsEnum } from '@/types'
import { useUserStore } from '@/store'

interface Props {
  disabled?: boolean
  placeholder?: string
  baseUrl: string
  isMultiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  placeholder: undefined,
  isMultiple: false,
  baseUrl: '',
})

const emit = defineEmits<{
  (e: 'selected', selectedData: any[] | any | null): void
  (e: 'close'): void
}>()

const userStore = useUserStore()

interface State {
  search: string
  data: Record<string, any>[]
  allData: Record<string, any>[]
  selectedItems: Record<string, any>[]
  timeout: number
  isLoading: boolean
}

const state = reactive<State>({
  search: '',
  data: [],
  allData: [],
  timeout: 0,
  selectedItems: [],
  isLoading: false,
})
const api = new APi(userStore.getCurrentUserToken!)

onMounted(async() => {
  if (!userStore.isCurrentUserAdmin) {
    state.isLoading = true
    await api.get(`${props.baseUrl}&limit=99999`).then((response: PaginatedResponse<EmployeeType>) => {
      state.data = response.data
      state.allData = response.data
    })
    state.isLoading = false
  }
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function searchEntity(event: Event) {
  if (userStore.isCurrentUserAdmin) {
    clearTimeout(state.timeout)
    state.timeout = window.setTimeout(async() => {
      state.isLoading = true
      await api.get(`${props.baseUrl}?search=${state.search}&limit=99999`).then((response: PaginatedResponse<EmployeeType>) => {
        state.data = response.data
      })
      state.isLoading = false
    }, 500)
  } else {
    const allDataReadonly = state.allData
    state.data = allDataReadonly.filter((item: Record<string, any>) => {
      if (parseInt(state.search)) {
        return item.id === parseInt(state.search)
      } else {
        return item.firstName.toLowerCase().includes(state.search.toLowerCase()) || item.lastName.toLowerCase().includes(state.search.toLowerCase())
      }
    })
  }
}

function onOptionClick(item: Record<string, any>) {
  if (props.isMultiple) {
    if (state.selectedItems.includes(item)) {
      removeItem(item.id)
    } else {
      state.selectedItems.push(item)
    }
    emit('selected', state.selectedItems)
  } else {
    state.selectedItems = [item]
    emit('selected', state.selectedItems[0])
  }
}

function removeItem(id: number) {
  state.selectedItems = state.selectedItems.filter(i => i.id !== id)
  emit('selected', state.selectedItems)
}
</script>
