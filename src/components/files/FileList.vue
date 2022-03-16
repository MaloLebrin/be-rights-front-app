<template>
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
            <BLink
              :variant="extraButtonStyle"
              class="EventActionButton"
              @click="deleteOneFile(file)"
            >Supprimer {{ file.name }}</BLink>
            <BLink
              v-if="file.format === FileFormatEnum.PDF"
              :variant="extraButtonStyle"
              class="EventActionButton"
              @click="downloadFile(file)"
            >Télécharger {{ file.name }}</BLink>
            <BLink
              :variant="extraButtonStyle"
              class="EventActionButton"
              @click="updateFile(file)"
            >Modifier {{ file.name }}</BLink>
          </template>
        </DashboardItem>
      </div>
    </div>
    <h4 v-else class="text-2xl font-semibold text-blue-dark dark:text-white">{{ noFileMesssage }}</h4>
  </div>
</template>

<script setup lang="ts">
import { FileType, ModalModeEnum, ModalNameEnum, FileFormatEnum } from '@/store/typesExported'
import { LoaderTypeEnum } from '@/types/globals'
import { useMainStore, useUiStore, useUserStore } from '@/store'

interface Props {
  files: FileType[]
}

withDefaults(defineProps<Props>(), {
  files: () => [],
})

const { isCurrentUserAdmin } = useUserStore()
const uiStore = useUiStore()
const { isDarkTheme } = useMainStore()
const { setUiModal } = uiStore
const { getTranslationFileType } = fileHook()
const { getDate } = dateHook()

function deleteOneFile(file: FileType) {
  setUiModal({
    isActive: true,
    modalName: ModalNameEnum.FILE_MODAL,
    modalMode: ModalModeEnum.DELETE,
    data: { file },
  })
}

function updateFile(file: FileType) {
  setUiModal({
    isActive: true,
    modalName: ModalNameEnum.FILE_MODAL,
    modalMode: ModalModeEnum.EDIT,
    data: { file },
  })
}

function downloadFile(file: FileType) {
  const blob = new Blob([file.secure_url], { type: "application/png" })
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = file.name
  link.click();
  URL.revokeObjectURL(link.href);
}

const noFileMesssage = computed(() =>
  isCurrentUserAdmin ? 'Aucun fichié enregistré dans la base de donnée' : 'Vous n\'avez pas de fichié enregistré dans la base de donnée'
)

const extraButtonStyle = computed(() => isDarkTheme ? 'primary' : "white")
</script>