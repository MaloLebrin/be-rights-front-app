<template>
  <div
    class="container relative px-4 py-5 space-y-12 bg-white shadow-xl dark:bg-blue-dark_bold rounded-2xl"
  >
    <div>
      <div class="flex items-center">
        <h5 class="px-6 py-4 text-xl font-medium">Votre logo</h5>
        <ArrowCircleDownIconOutline class="w-6 h-6 text-gray-600" />
      </div>

      <div class="px-6 py-4 space-y-12">
        <div>
          <InputFile message="Sélectionnez votre logo" :url="userLogoUrl" @uploadFile="uploadFile" />
        </div>
        <div class="flex items-center justify-center">
          <BaseButton :disabled="!state.file" @click="submitFile">
            <template #icon>
              <SaveIconOutline />
            </template>
            Enregistrer le Logo
          </BaseButton>
        </div>
      </div>
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
    <Userform
      v-if="state.mode === ModalModeEnum.EDIT"
      :id="userStore.getCurrentUserId ? userStore.getCurrentUserId : null"
    />
    <UserDetails
      v-if="state.mode === ModalModeEnum.READ"
      :id="userStore.getCurrentUserId ? userStore.getCurrentUserId : null"
    />
    <div v-if="state.mode === ModalModeEnum.READ" class="flex items-center justify-center">
      <BaseButton @click="switchMode">{{ getButtonLabel() }}</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FileTypeEnum, ModalModeEnum } from '@/types/typesExported'

interface State {
  mode: ModalModeEnum
  file: FormData | null
}

const state = reactive<State>({
  mode: ModalModeEnum.READ,
  file: null,
})

const userStore = useUserStore()
const { IncLoading, DecLoading } = useUiStore()
const { postOne } = fileHook()
const { getAllArray } = storeToRefs(useFileStore())

const userLogoUrl = computed(() => getAllArray.value.filter(file => file.createdByUser === userStore.getCurrentUserId && file.type === FileTypeEnum.LOGO)[0]?.secure_url)

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
  // TODO how to post/patch a file base64
  const formData = new FormData()
  formData.append('file', fileUploaded)
  formData.append('type', FileTypeEnum.LOGO)
  formData.append('userId', userStore.getCurrentUserId!.toString())
  formData.append('name', 'logo')
  formData.append('description', 'Logo de l\'utilisateur')
  state.file = formData
}

async function submitFile() {
  if (state.file) {
    IncLoading()
    if (userStore.isCurrentUserAdmin) {
      await postOne(state.file, userStore.getCurrentUserId)
    }
    DecLoading()
  }
}
</script>