<template>
<TransitionRoot
  as="template"
  :show="open"
>
  <Dialog
    as="div"
    class="fixed inset-0 z-10 overflow-y-auto"
    @close="open = false"
  >
    <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
      </TransitionChild>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-bottom sm:h-screen"
        aria-hidden="true"
      >&#8203;</span>
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leave-from="opacity-100 translate-y-0 sm:scale-100"
        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div class="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full sm:p-6">
          <div>
            <div class="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
              <AdjustmentsHorizontalIconOutline
                class="w-6 h-6 text-green-600"
                aria-hidden="true"
              />
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-center text-gray-900"
              >
                Gestion des cookies
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  <span class="font-medium text-red-500">Be right</span>
                  utilise seulement les cookies pour être automatiquement authentifié sur le site, sauf si vous vous déconnectez.
                </p>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center mt-5 sm:mt-6">
            <BaseButton
              color="blue"
              @click="accepteCookies"
            >
              J'ai compris
            </BaseButton>
          </div>
        </div>
      </TransitionChild>
    </div>
  </Dialog>
</TransitionRoot>
</template>

<script setup lang="ts">
import { useCookies } from 'vue3-cookies'
const mainStore = useMainStore()
const { setCookiesAccepted } = useMainStore()
const { cookies } = useCookies()
const open = ref(!mainStore.getAreCookiesAccepted)

onMounted(async () => {
  const cookiesAccepted = cookies.get('areCookiesAccepted')
  if (cookiesAccepted) {
    setCookiesAccepted()
    open.value = false
  }
})

function accepteCookies() {
  cookies.set('areCookiesAccepted', 'true')
  open.value = false
  setCookiesAccepted()
}
</script>
