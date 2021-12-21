<template>
	<div>
		<BInput class="text-white dark:text-blue-dark" type="text" id="search" v-model="state.search" />
		{{ state.search }}
	</div>
</template>
<script setup lang='ts'>
import { onMounted, reactive, watch } from 'vue'
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
	timeout: undefined,
})
const api = new APi(userStore.entities.current?.token!)
const input = document.getElementById('search')

onMounted(() => {
	input?.addEventListener('keyup', (e) => {
		if (state.timeout) {
			clearTimeout(state.timeout)
		}
		state.timeout = setTimeout(() => {
			state.waitingSearch = true
			api.get(`${props.baseUrl}?search=${state.search}`).then((response: PaginatedResponse<EmployeeType>) => {
				state.data = response.data
				state.waitingSearch = false
			})
		}, 500)
	})
})

watch(() => state.search, async (newValue) => {
	console.log('search', newValue)
	if (newValue.length > 0) {
		clearTimeout(state.timeout)
		setTimeout(async () => {
			const response: PaginatedResponse<EmployeeType> = await api.get(`${props.baseUrl}?search=${newValue}&limit=999999`)
			console.log('response', response)
			state.data = response.data
		}, 800)
	}
})

</script>