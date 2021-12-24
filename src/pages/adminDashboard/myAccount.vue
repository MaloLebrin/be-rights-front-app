<template>
	<div
		class="min-h-screen transform ease-in-out transition-all duration-500 py-6 text-left pl-14 pr-8 space-y-20"
	>
		<HeaderList :withAdditionnalButtons="false" class="mb-32">
			<template #title>
				<UserIconOutline class="h-8 mr-4 dark:bg-red rounded-lg p-1" />Mon compte
			</template>
		</HeaderList>

		<div class="container bg-white dark:bg-blue-dark_bold shadow-xl py-4 rounded-2xl space-y-12">
			<Userform v-if="state.mode === ModalModeEnum.EDIT" :id="getCurrent?.id" />
			<UserDetails v-if="state.mode === ModalModeEnum.READ" :id="getCurrent?.id" />
			<div v-if="state.mode === ModalModeEnum.READ" class="flex items-center justify-center">
				<BButton variant="white" class="text-blue-dark" @click="switchMode">{{ getButtonLabel() }}</BButton>
			</div>
		</div>
	</div>
</template>

<route>
{meta: {
  layout: "AdminDashboardLayout",
}
}
</route>

<script setup lang='ts'>
import { useUserStore } from '@/store'
import { ModalModeEnum } from '@/store/typesExported'

const { getCurrent } = useUserStore()

interface State {
	mode: ModalModeEnum
}

const state = reactive({
	mode: ModalModeEnum.READ,
})

function getButtonLabel() {
	return state.mode === ModalModeEnum.READ ? 'Modifier' : 'Enregistrer'
}

function switchMode() {
	if (state.mode === ModalModeEnum.READ) {
		state.mode = ModalModeEnum.EDIT
	} else {
		state.mode = ModalModeEnum.READ
	}
}
</script>