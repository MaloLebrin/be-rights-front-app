<template>
<img
  v-if="user.profilePicture"
  class="relative w-32 h-32 rounded-full"
  :src="user.profilePicture"
  alt="photo de profile"
>
<UsersUserAvatar
  v-else
  :user="user"
/>
<label
  for="desktop-user-photo"
  class="absolute inset-0 flex items-center justify-center w-full h-full text-sm font-medium text-white bg-black bg-opacity-75 opacity-0 hover:opacity-100 focus-within:opacity-100"
>
  <span>Change</span>
  <span class="sr-only">user photo</span>
  <input
    id="desktop-user-photo"
    ref="profilePicture"
    type="file"
    name="user-photo"
    class="absolute inset-0 w-full h-full border-gray-300 rounded-md opacity-0 cursor-pointer"
    @change="uploadProfilePicture"
  >
</label>
</template>

<script setup lang="ts">
import type { UserType } from '@/types'
import { useUiStore } from '~~/store'

interface Props {
  user: UserType
}

defineProps<Props>()

const { IncLoading, DecLoading } = useUiStore()
const { postProfilePicture } = fileHook()

const profilePicture = ref<null | HTMLInputElement>(null)

async function uploadProfilePicture() {
  IncLoading()
  if (profilePicture.value && profilePicture.value.files) {
    const fileUploaded = profilePicture.value.files[0]
    const formData = new FormData()
    formData.append('file', fileUploaded)
    await postProfilePicture(formData)
  }
  DecLoading()
}
</script>
