<template>
  <div
    class="min-h-screen py-6 pr-8 text-left transition-all duration-500 ease-in-out transform pl-14"
  >
    <HeaderList>
      <template #title>
        <UserIconOutline class="h-8 p-1 mr-4 rounded-lg dark:bg-red" />
        {{ user.firstName }} {{ user.lastName }}
      </template>
    </HeaderList>

    <div class="space-y-10">
      <div class="py-4 mt-24 space-y-32 rounded-lg shadow-lg">
        <Userform :id="userStore.getFirstActive" />
      </div>

      <BaseAccordion class="rounded-full shadow-2xl dark:bg-blue-dark_bold animate-fade-in-down">
        <template #title>
          <h5 class="px-6 py-4 text-xl font-medium">Logo de l'utilisateur</h5>
        </template>

        <div class="px-6 py-4">
          <InputFile
            message="Sélectionnez votre logo"
            :url="userLogo?.secure_url"
            @uploadFile="uploadFile"
          />
          <div class="flex items-center justify-center">
            <BaseButton :disabled="!state.file" @click="submitFile">
              <template #icon>
                <SaveIconOutline />
              </template>
              Enregistrer le Logo
            </BaseButton>
          </div>
        </div>
      </BaseAccordion>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FileType, FileTypeEnum } from '@/types/typesExported'
import { onBeforeRouteLeave } from 'vue-router'

const userStore = useUserStore()
const { resetActive } = userStore
const fileStore = useFileStore()
const { DecLoading, IncLoading } = useUiStore()
const { fetchAll, postOne } = fileHook()

interface State {
  file: FormData | null
}

const state = reactive<State>({
  file: null,
})

onBeforeRouteLeave(() => {
  resetActive()
})

const user = computed(() => userStore.getOne(userStore.getFirstActive))
const userLogo = computed(() =>
  fileStore.getFirstWhere(file => file.createdByUser === userStore.getFirstActive &&
    file.type === FileTypeEnum.LOGO) as FileType
)

onMounted(async () => {
  if (!userLogo.value) {
    await fetchAll(`?filters[type]=${FileTypeEnum.LOGO}&filters[createdByUser]=${userStore.getFirstActive}`)
  }
})

function uploadFile(fileUploaded: File) {
  const formData = new FormData()
  formData.append('file', fileUploaded)
  formData.append('type', FileTypeEnum.LOGO)
  formData.append('userId', userStore.getFirstActive.toString())
  formData.append('name', 'logo')
  formData.append('description', 'Logo de l\'utilisateur')
  state.file = formData
}

async function submitFile() {
  if (state.file && !userLogo.value) {
    IncLoading()
    await postOne(state.file)
    DecLoading()
    state.file = null
  }
}
</script>

<!-- <route>
{
  meta: {
    layout: "AdminDashboardLayout",
    isAuth: true,
  }
}
</route> -->
