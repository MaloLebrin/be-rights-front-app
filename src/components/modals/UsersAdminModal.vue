<template>
  <BaseModal
    class="w-5/6 font-medium text-black-light dark:text-white"
    :title="getModaleTitle()"
    :isLoading="uiStore.getUIIsLoading"
    :isActive="isActive"
    @close="close"
  >
    <div v-if="mode === ModalModeEnum.DELETE" class="py-6">
      <p
        class="text-center text-gray-800 dark:text-white"
      >Êtes vous sur de supprimer cet utilisateur ?</p>
      <div class="flex items-center justify-center mt-12 space-x-6">
        <BButton variant="danger" :isLoading="uiStore.getUIIsLoading" @click="deleteOne">Supprimer</BButton>
        <BButton :variant="isDarkTheme ? 'white' : 'primary'" @click="close">Annuler</BButton>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ModalModeEnum } from '@/types/typesExported'
import { useMainStore, useUiStore } from '@/store'

interface Props {
  mode?: ModalModeEnum
  isActive: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  mode: undefined,
})

const mainStore = useMainStore()
const uiStore = useUiStore()
const { isDarkTheme } = mainStore
const { deleteUser } = userHook()
const { IncLoading, DecLoading } = uiStore

const user = computed(() => {
  if (uiStore.getUiModalData && uiStore.getUiModalData.user) {
    return uiStore.getUiModalData.user
  }
})

function getModaleTitle() {
  if (user.value) {
    switch (props.mode) {
      case ModalModeEnum.CREATE:
        return 'Nouvel utilisateur'
      case ModalModeEnum.EDIT:
        return `Modifier utilisateur ${user.value?.id}`
      case ModalModeEnum.DELETE:
        return `Supprimer utilisateur ${user.value?.id}`
      default:
        return 'Unknown mode'
    }
  }
}

async function deleteOne() {
  if (user?.value.id) {
    IncLoading()
    await deleteUser(user.value.id)
    DecLoading()
    close()
  }
}

const emit = defineEmits<{
  (e: 'close'): void
}>()

function close() {
  emit('close')
}
</script>
