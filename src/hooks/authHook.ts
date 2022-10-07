import { useCookies } from 'vue3-cookies'
import API from '@/helpers/api'
import type { JWTDecodedType, ValidationRequest } from '@/types'

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
  const api = new API()
  const router = useRouter()
  const toast = useToast()
  const { cookies } = useCookies()

  function logout() {
    api.deleteCredentials()
    userStore.removeCurrent()
    cookies.remove('userToken')
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
      storeUsersEntities(user, true)
    } catch (error) {
      console.error(error)
    }
    DecLoading()
  }

  async function checkMailIsAlreadyExist(email: string) {
    const res: ValidationRequest = await api.post('user/isMailAlreadyExist', { email })
    return res
  }

  function getRouteName(routeName: string) {
    const roleRoutePrefix = userStore.getRoutePrefixBasedOnRole
    if (roleRoutePrefix) {
      return `${roleRoutePrefix}.${routeName}`
    }
    return ''
  }

  function jwtDecode(jwt: any): JWTDecodedType | null {
    if (typeof jwt !== 'string' && !(jwt instanceof String))
      return null

    const splitted = jwt.split('.')
    if (splitted.length < 2)
      return null

    const obj1 = JSON.parse(window.atob(splitted[0]))
    const obj2 = JSON.parse(window.atob(splitted[1]))
    return Object.assign({}, obj1, obj2)
  }

  const userLogged = ref<JWTDecodedType | null>(null)

  function setUserLogged(payload: JWTDecodedType) {
    userLogged.value = payload
  }

  function resetUserLogged() {
    userLogged.value = null
  }

  return {
    checkMailIsAlreadyExist,
    getRouteName,
    jwtDecode,
    loginWithToken,
    logout,
    resetUserLogged,
    setUserLogged,
    userLogged,
  }
}
