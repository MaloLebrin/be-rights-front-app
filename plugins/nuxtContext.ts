import { useToast } from 'vue-toastification'
import API from '~~/helpers/api'
import { useAuthStore } from '~~/store'

export default defineNuxtPlugin(() => {
  function isProductionMode() {
    return parseInt(import.meta.env.VITE_PROD.toString()) === 1 && parseInt(import.meta.env.VITE_DEV.toString()) === 0
  }

  return {
    provide: {
      api: () => {
        const api = new API()
        return api
      },
      getApiUrl: isProductionMode() ? import.meta.env.VITE_API_URL as string : import.meta.env.VITE_DEV_API_URL as string,
      isProductionMode: isProductionMode(),
      authStore: useAuthStore(),
      toast: useToast(),
    },
  }
})
