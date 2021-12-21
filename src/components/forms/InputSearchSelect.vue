<template>
	<div>
		<div v-if="state.selectedItems.length > 0" class="grid grid-cols-5 gap-4 mb-4">
			<Tag
				v-for="item in state.selectedItems"
				:key="item.id"
				:variant="TagVariantsEnum.PROMOTION"
				@close="removeItem(item.id)"
			>{{ item.firstName }} {{ item.lastName }}</Tag>
		</div>
		<BInput
			class="text-white dark:text-blue-dark"
			type="text"
			id="search"
			v-model="state.search"
			@keyup="searchEntity($event)"
		/>
		<div
			v-if="state.data.length > 0"
			class="relative bg-white w-full border border-gray-400 dark:border-indigo-100 text-gray-700 shadow-inner cursor-pointer overflow-y-auto max-h-48"
			:tabindex="0"
		>
			<div
				v-for="item in state.data"
				:key="item.id"
				class="hover:bg-gray-600 hover:text-white py-3 px-4 flex items-center justify-between"
				@click="onOptionClick(item)"
			>
				<span>{{ item.firstName }} {{ item.lastName }}</span>
				<CheckIcon v-if="state.selectedItems.includes(item)" class="text-green w-6 h-6" />
			</div>
		</div>
	</div>
</template>
<script setup lang='ts'>
import { reactive } from 'vue'
import { CheckIcon } from '@heroicons/vue/outline'
import APi, { PaginatedResponse } from "@/helpers/api"
import { useUserStore } from '@/store'
import { EmployeeType } from '@/store/typesExported'
import { TagVariantsEnum } from '@/types'

interface Props {
	disabled?: boolean
	placeholder?: string
	baseUrl: string
}
const props = withDefaults(defineProps<Props>(), {
	disabled: false,
	placeholder: undefined,
	baseUrl: '',
})

const emit = defineEmits<{
	(e: 'selected', selectedData: any[]): void
	(e: 'close'): void
}>()

const userStore = useUserStore()

const state = reactive({
	search: '',
	data: [],
	waitingSearch: false,
	timeout: 0,
	selectedItems: [],
})
const api = new APi(userStore.entities.current?.token!)

async function searchEntity(event: Event) {
	clearTimeout(state.timeout)
	state.timeout = setTimeout(async () => {
		await api.get(`${props.baseUrl}?search=${state.search}&limit=99999`).then((response: PaginatedResponse<any>) => {
			state.data = response.data
		})
	}, 500)
}

function onOptionClick(item: any) {
	if (state.selectedItems.includes(item)) {
		removeItem(item.id)
	} else {
		state.selectedItems.push(item)
	}
	emit('selected', state.selectedItems)
}

function removeItem(id: number) {
	state.selectedItems = state.selectedItems.filter(i => i.id !== id)
}

</script>