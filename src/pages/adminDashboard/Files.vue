<template>
	<div
		class="relative min-h-screen py-6 pr-8 text-left transition-all duration-500 ease-in-out transform bg-white-light dark:bg-blue-dark pl-14"
	>
		<HeaderList>
			<template #title>
				<FolderOpenIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />Fichiers
			</template>
		</HeaderList>
		<div class="relative mt-32">
			<Loader
				v-if="uiStore.getUIIsLoading"
				:isLoading="uiStore.getUIIsLoading"
				:type="LoaderTypeEnum.BOUNCE"
			/>

			<div v-else-if="files.length > 0">
				<div v-for="(file, index) in files" :key="file.id">
					<DashboardItem :index="index">
						<template #title>
							<div class="grid grid-cols-1 gap-4 px-4 py-4 md:grid-cols-4">
								<span class="text-sm text-gray-500 dark:text-gray-400">Nom du fichier</span>
								<span class="text-sm text-gray-500 dark:text-gray-400">Taille</span>
								<span class="text-sm text-gray-500 dark:text-gray-400">Créé le :</span>
								<span class="text-sm text-gray-500 dark:text-gray-400">Type :</span>
								<span class="dark:text-white">{{ file.name }}</span>
								<span class="dark:text-white">{{ file.size }} mo</span>
								<span class="dark:text-white">{{ getDate(file.createdAt.toString()) }}</span>
								<span class="dark:text-white">{{ getTranslationFileType(file.type) }}</span>
							</div>
						</template>

						<div class="flex items-center justify-center py-4">
							<img class="w-32 h-32 rounded" :src="file.secure_url" :alt="file.original_filename" />
						</div>

						<template #extraButton>
							<BLink class="EventActionButton">Supprimer {{ file.name }}</BLink>
							<BLink :href="file.secure_url" class="EventActionButton">Télécharger {{ file.name }}</BLink>
							<BLink class="EventActionButton">Modifier {{ file.name }}</BLink>
						</template>
					</DashboardItem>
				</div>
			</div>

			<h4
				v-else
				class="text-2xl font-semibold text-blue-dark dark:text-white"
			>Aucun fichier enregistré dans la base de donnée</h4>
		</div>
	</div>
</template>

<script setup lang="ts">
import { dateHook, fileHook } from '@/hooks'
import { useFileStore, useMainStore, useUiStore } from '@/store'
import { EmployeeType, ModalModeEnum, ModalNameEnum } from '@/store/typesExported'
import { LoaderTypeEnum } from '@/types/globals'

const uiStore = useUiStore()
const { isDarkTheme } = useMainStore()
const { setUiModal, IncLoading, DecLoading } = uiStore
const { fetchAll, getTranslationFileType } = fileHook()
const { getDate } = dateHook()
const { getAllArray } = useFileStore()


const files = computed(() => getAllArray)


onMounted(async () => {
	IncLoading()
	await fetchAll()
	DecLoading()
})


</script>

<route>
{meta: {
  layout: "AdminDashboardLayout"
}
}
</route>
