import { useCookies } from 'vue3-cookies'
import type { JWTDecodedType, ValidationRequest } from '@/types'
import { useAnswerStore, useEmployeeStore, useFileStore, useTableStore, useUiStore, useUserStore } from '~~/store'
import { useBugStore } from '~~/store/bug'
import { useEventStore } from '~~/store/event'
import { useMainStore } from '~~/store/main'

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
  const router = useRouter()
  const { $toast, $api } = useNuxtApp()

  const { cookies } = useCookies()

  function logout() {
    $api().deleteCredentials()
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

    router.replace({ name: 'index' })
    $toast.success('Vous êtes déconnecté')
  }

  async function loginWithToken(token: string) {
    IncLoading()
    try {
      const user = await $api().post('user/token', { token })
      setThemeClass(user.theme)
      storeUsersEntities(user, true)
    } catch (error) {
      console.error(error)
    }
    DecLoading()
  }

  async function checkMailIsAlreadyExist(email: string) {
    const res: ValidationRequest = await $api().post('user/isMailAlreadyExist', { email })
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

    const obj1 = Buffer.from(splitted[0], 'base64').toString('utf-8')
    const obj2 = Buffer.from(splitted[1], 'base64').toString('utf-8')
    return {
      ...JSON.parse(obj1),
      ...JSON.parse(obj2),
    }
  }

  const userLogged = ref<JWTDecodedType | null>(null)

  function setUserLogged(payload: JWTDecodedType) {
    userLogged.value = payload
    console.log(userLogged.value, '<==== userLogged.value')
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
