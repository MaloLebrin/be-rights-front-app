<template>
	<div
		class="min-h-screen transform ease-in-out transition-all duration-500 py-6 text-left pl-14 pr-8 space-y-20"
	>
		<HeaderList :withAdditionnalButtons="false" class="mb-32">
			<template #title>
				<UserIconOutline class="h-8 mr-4 dark:bg-red rounded-lg p-1" />Mon compte
			</template>
		</HeaderList>

		<div
			class="container bg-white dark:bg-blue-dark_bold shadow-xl px-4 py-5 rounded-2xl space-y-12 relative"
		>
			<BField label="Logo" labelFor="firstName" class="text-blue-dark dark:text-white-break">
				<InputFile message="Sélectionnez votre logo" :url="userLogo.secure_url" @upload="testFile" />
			</BField>
			<div class="flex items-center justify-center">
				<BButton variant="white" class="text-blue-dark" @click="submitFile">Enregistrer le Logo</BButton>
			</div>
		</div>
		<div
			class="container bg-white dark:bg-blue-dark_bold shadow-xl py-4 rounded-2xl space-y-12 relative"
		>
			<ChevronLeftIconOutline
				v-if="state.mode !== ModalModeEnum.READ"
				class="text-gray-400 absolute top-0 -left-6 h-12 shadowl bg-white dark:bg-blue-dark_bold dark:text-white rounded-l-xl transform transition duration-500 hover:scale-125 cursor-pointer z-30"
				@click="switchMode"
			/>
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
import { fileHook } from '@/hooks'
import { useFileStore, useUserStore } from '@/store'
import { FileTypeEnum, ModalModeEnum } from '@/store/typesExported'

const { getCurrent } = useUserStore()
const { postOne } = fileHook()
const { getAllArray } = useFileStore()

interface State {
	mode: ModalModeEnum
	file: FormData | null
}

const userLogo = computed(() => getAllArray.filter(file => file.createdByUser === getCurrent?.id && file.type === FileTypeEnum.LOGO)[0])

const state = reactive<State>({
	mode: ModalModeEnum.READ,
	file: null,
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

function testFile(fileUploaded: File) {
	const formData = new FormData()
	formData.append('file', fileUploaded)
	formData.append('type', FileTypeEnum.LOGO)
	formData.append('userId', getCurrent!.id.toString())
	formData.append('name', 'logo')
	formData.append('description', 'Logo de l\'utilisateur')
	state.file = formData
}

async function submitFile() {
	if (state.file) {
		await postOne(state.file)
	}
}
</script>