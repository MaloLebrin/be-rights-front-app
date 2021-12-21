<template>
	<div>
		<BInput
			class="text-white dark:text-blue-dark"
			type="text"
			id="search"
			v-model="state.search"
			@keyup="searchEntity($event)"
		/>
	</div>
</template>
<script setup lang='ts'>
import { reactive } from 'vue'
import APi, { PaginatedResponse } from "@/helpers/api"
import { useUserStore } from '@/store'
import { EmployeeType } from '@/store/typesExported'

interface Props {
	disabled?: boolean
	placeholder?: string
	modelValue: any[]
	baseUrl: string
}
const props = withDefaults(defineProps<Props>(), {
	disabled: false,
	placeholder: undefined,
	modelValue: [],
	baseUrl: '',
})

const userStore = useUserStore()

const state = reactive({
	search: '',
	data: [],
	waitingSearch: false,
	timeout: 0,
})
const api = new APi(userStore.entities.current?.token!)

async function searchEntity(event: Event) {
	clearTimeout(state.timeout)
	state.timeout = setTimeout(async () => {
		await api.get(`${props.baseUrl}?search=${state.search}`).then((response: PaginatedResponse<EmployeeType>) => {
			state.data = response.data
		})
	}, 500)
}


</script>