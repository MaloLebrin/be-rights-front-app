import axiosInstance from "@/axios.config"
import API from "@/helpers/api"
import { useCookie } from 'vue-cookie-next'

export default function authHook() {
  const userStore = useUserStore()
  const mainStore = useMainStore()
  const { getCookie } = useCookie()
  const { setThemeClass } = mainHook()
  const { storeUsersEntities } = userHook()
  const { IncLoading, DecLoading } = useUiStore()
  const api = new API(userStore.getCurrentUserToken!)
  const router = useRouter()

  function setBearerToken(token: string) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  function logout() {
    api.deleteCredentials()
    mainStore.setIsLoggedOut()
    userStore.removeCurrent()
    mainStore.resetAllState()
    router.replace({ name: 'home' })
  }

  async function loginWithToken(token: string) {
    IncLoading()
    try {
      const user = await api.post('user/token', { token: token })
      setThemeClass(user.theme)
      storeUsersEntities(user)
    } catch (error) {
      console.error(error)
    }
    DecLoading()
  }

  async function routesIntermsOfUserRoles() {
    IncLoading()
    const token = getCookie('userToken')
    if (token && token.length > 0) {
      await loginWithToken(token)
      mainStore.setIsLoggedIn()

      // TODO abstract this to a function DRY
      if (userStore.isCurrentUserAdmin) {
        router.push({ name: 'admin.events' })
      } else {
        router.push({ name: 'user.events' })
      }
    } else {
      router.push({ name: 'login' })
    }
    DecLoading()
  }


  return {
    setBearerToken,
    logout,
    loginWithToken,
    routesIntermsOfUserRoles,
  }
}