<template>

    <BaseModal
      class="w-48"
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
import { computed, reactive } from 'vue'
import { UserType } from '@/store/typesExported'

enum UsersModalModeEnum {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

interface Props {
  mode: UsersModalModeEnum | null
  user: UserType
  isActive: boolean
}

const state = reactive({
  isLoading: false,
})

const props = withDefaults(defineProps<Props>(), {
  isActive: true,
})

const isActive = computed(() => props.isActive)

function getModaleTitle() {
  switch (props.mode) {
    case UsersModalModeEnum.CREATE:
      return 'Nouvel utilisateur'
    case UsersModalModeEnum.UPDATE:
      return 'Modifier utilisateur'
    case UsersModalModeEnum.DELETE:
      return 'Supprimer utilisateur'
    default:
      return 'Unknown mode'
  }
}
</script>
