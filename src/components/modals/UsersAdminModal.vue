<template>
  <BaseModal
    class="w-5/6 text-black-light dark:text-white font-medium"
    :title="getModaleTitle()"
    :isLoading="uiStore.getUIIsLoading"
    :isActive="isActive"
    @close="close"
  >
    <div v-if="mode === ModalModeEnum.UPDATE && user" class="h-full mt-12">
      <Userform :id="user.id" />
    </div>
    <div v-else-if="mode === ModalModeEnum.DELETE" class="py-6">
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
import { ModalModeEnum, UserType } from '@/store/typesExported'
import { useMainStore, useUiStore } from '@/store'
import { userHook } from '@/hooks'

interface Props {
  user?: UserType
  mode?: ModalModeEnum
  isActive: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  user: undefined,
  mode: undefined,
})

const mainStore = useMainStore()
const uiStore = useUiStore()
const { isDarkTheme } = mainStore
const { deleteUser } = userHook()
const { IncLoading, DecLoading } = uiStore

function getModaleTitle() {
  if (props.user) {
    switch (props.mode) {
      case ModalModeEnum.CREATE:
        return 'Nouvel utilisateur'
      case ModalModeEnum.UPDATE:
        return `Modifier utilisateur ${props.user.id}`
      case ModalModeEnum.DELETE:
        return `Supprimer utilisateur ${props.user.id}`
      default:
        return 'Unknown mode'
    }
  }
}

async function deleteOne() {
  IncLoading()
  await deleteUser(props.user.id)
  DecLoading()
  close()
}

const emit = defineEmits<{
  (e: 'close'): void
}>()

function close() {
  emit('close')
}


</script>
