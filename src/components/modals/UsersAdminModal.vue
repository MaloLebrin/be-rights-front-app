<template>
    <BaseModal
      class="w-5/6"
      :title="getModaleTitle()"
      :isLoading="state.isLoading"
      :isActive="isActive"
      @close="close"
    >
      <div
        v-if="mode === UsersModalModeEnum.UPDATE"
      >
        test update
        {{ user }}

      </div>
      <div v-else-if="mode === UsersModalModeEnum.CREATE">
        test create
              {{ user }}

      </div>
      <div v-else-if="mode === UsersModalModeEnum.DELETE">
        test delete
              {{ user }}

      </div>
	</BaseModal>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { UserType } from '@/store/typesExported'

enum UsersModalModeEnum {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

interface Props {
  user: null | UserType
  mode: null | UsersModalModeEnum
  isActive: boolean
}

const state = reactive({
  isLoading: false,
})

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  user: null,
  mode: null,
})

function getModaleTitle() {
  if (props.user) {
    switch (props.mode) {
      case UsersModalModeEnum.CREATE:
        return 'Nouvel utilisateur'
      case UsersModalModeEnum.UPDATE:
        return `Modifier utilisateur ${props.user.id}`
      case UsersModalModeEnum.DELETE:
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
