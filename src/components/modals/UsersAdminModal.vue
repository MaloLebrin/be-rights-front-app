<template>
    <BaseModal
      class="w-5/6 text-black-light dark:text-white font-medium"
      :title="getModaleTitle()"
      :isLoading="state.isLoading"
      :isActive="isActive"
      @close="close"
    >
      <div
        v-if="mode === ModalModeEnum.UPDATE && user"
        class="h-full"
      >
        <Userform :id="user.id" />
      </div>
      <div v-else-if="mode === ModalModeEnum.DELETE">
        test delete
              {{ user }}

      </div>
	</BaseModal>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ModalModeEnum, UserType } from '@/store/typesExported'


interface Props {
  user?:  UserType
  mode?: ModalModeEnum
  isActive: boolean
}

const state = reactive({
  isLoading: false,
})

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  user: undefined,
  mode: undefined,
})

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
const emit = defineEmits<{
	(e: 'close'): void
}>()
function close() {
  emit('close')
}
</script>
