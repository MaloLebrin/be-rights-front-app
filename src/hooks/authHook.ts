import { useCookies } from 'vue3-cookies'
import API from '@/helpers/api'

export default function authHook() {
  const userStore = useUserStore()
  const mainStore = useMainStore()
  const answerStore = useAnswerStore()
  const bugStore = useBugStore()
  const employeeStore = useEmployeeStore()
  const eventStore = useEventStore()
  const fileStore = useFileStore()
  const tableStore = useTableStore()
  const uiStore = useUiStore()
  const { setThemeClass } = mainHook()
  const { storeUsersEntities } = userHook()
  const { IncLoading, DecLoading } = useUiStore()
  const api = new API(userStore.getCurrentUserToken!)
  const router = useRouter()
  const toast = useToast()

  function logout() {
    const { cookies } = useCookies()

    api.deleteCredentials()
    cookies.remove('userToken')
    userStore.removeCurrent()

    answerStore.resetState()
    bugStore.resetState()
    employeeStore.resetState()
    eventStore.resetState()
    fileStore.resetState()
    mainStore.resetAllState()
    tableStore.resetTableState()
    uiStore.resetUIState()
    userStore.resetState()

    router.replace({ name: 'home' })
    toast.success('Vous êtes déconnecté')
  }

  async function loginWithToken(token: string) {
    IncLoading()
    try {
      const user = await api.post('user/token', { token })
      setThemeClass(user.theme)
      storeUsersEntities(user)
    } catch (error) {
      console.error(error)
    }
    DecLoading()
  }

  return {
    logout,
    loginWithToken,
  }
}
