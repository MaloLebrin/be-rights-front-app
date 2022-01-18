<template>
  <div
    class="container relative px-4 py-5 space-y-12 bg-white shadow-xl dark:bg-blue-dark_bold rounded-2xl"
  >
    <BField label="Logo" labelFor="firstName" class="text-blue-dark dark:text-white-break">
      <InputFile message="Sélectionnez votre logo" :url="userLogoUrl" @uploadFile="uploadFile" />
    </BField>
    <div class="flex items-center justify-center">
      <BButton variant="white" class="text-blue-dark" @click="submitFile">Enregistrer le Logo</BButton>
    </div>
  </div>
  <div
    class="container relative py-4 space-y-12 bg-white shadow-xl dark:bg-blue-dark_bold rounded-2xl"
  >
    <ChevronLeftIconOutline
      v-if="state.mode !== ModalModeEnum.READ"
      class="absolute top-0 z-30 h-12 text-gray-400 transition duration-500 transform bg-white cursor-pointer -left-6 shadowl dark:bg-blue-dark_bold dark:text-white rounded-l-xl hover:scale-125"
      @click="switchMode"
    />
    <Userform v-if="state.mode === ModalModeEnum.EDIT" :id="getCurrentUserId" />
    <UserDetails v-if="state.mode === ModalModeEnum.READ" :id="getCurrentUserId" />
    <div v-if="state.mode === ModalModeEnum.READ" class="flex items-center justify-center">
      <BButton variant="white" class="text-blue-dark" @click="switchMode">{{ getButtonLabel() }}</BButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fileHook } from '@/hooks';
import { useFileStore, useUserStore } from '@/store';
import { FileTypeEnum, ModalModeEnum } from '@/store/typesExported'

interface State {
  mode: ModalModeEnum
  file: FormData | null
}

const state = reactive<State>({
  mode: ModalModeEnum.READ,
  file: null,
})

const { getCurrentUserId } = useUserStore()
const { postOne } = fileHook()
const { getAllArray } = useFileStore()

const userLogoUrl = computed(() => getAllArray.filter(file => file.createdByUser === getCurrentUserId && file.type === FileTypeEnum.LOGO)[0]?.secure_url)

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

function uploadFile(fileUploaded: File) {
  const formData = new FormData()
  formData.append('file', fileUploaded)
  formData.append('type', FileTypeEnum.LOGO)
  formData.append('userId', getCurrentUserId!.toString())
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