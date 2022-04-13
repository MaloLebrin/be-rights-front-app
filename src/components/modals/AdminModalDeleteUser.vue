<template>
<BaseModal
  :is-active="isActive"
  @close="close"
>
  <div class="sm:flex sm:items-start">
    <div
      class="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10"
    >
      <ExclamationIconOutline
        class="w-6 h-6 text-red-600"
        aria-hidden="true"
      />
    </div>
    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      <DialogTitle
        as="h3"
        class="text-lg font-medium leading-6 text-gray-900"
      >
        Êtes vous sur de supprimer cet utilisateur ?
      </DialogTitle>
      <div class="mt-2">
        <p class="text-sm text-gray-500">
          Êtes-vous sûr de vouloir désactiver votre compte ? Toutes vos données
          seront définitivement supprimés de nos serveurs pour toujours. Cette action ne peut pas être annulée.
        </p>
      </div>
    </div>
  </div>
  <div class="mt-5 sm:space-x-8 sm:mt-4 sm:flex sm:items-center sm:justify-center">
    <BaseButton
      color="red"
      :is-loading="uiStore.getUIIsLoading"
      @click="deleteOne"
    >
      Supprimer
    </BaseButton>
    <BaseButton @click="close">
      Annuler
    </BaseButton>
  </div>
</BaseModal>
</template>

<script setup lang="ts">
interface Props {
  isActive: boolean
}

withDefaults(defineProps<Props>(), {
  isActive: false,
})

const uiStore = useUiStore()
const { deleteUser } = userHook()
const { IncLoading, DecLoading, resetUiModalState } = uiStore

const user = computed(() => {
  if (uiStore.getUiModalData && uiStore.getUiModalData.user) {
    return uiStore.getUiModalData.user
  }
})

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
  resetUiModalState()
  emit('close')
}
</script>
