import { useCookies } from 'vue3-cookies'
import { RoleEnum } from '~~/types'

export default defineNuxtRouteMiddleware((to, from) => {
  if (from.name !== to.name) {
    const { isAuth, isAdmin } = to.meta
    const { cookies } = useCookies()
    const { $authStore } = useNuxtApp()
    const { jwtDecode } = authHook()

    if (isAuth && $authStore.getIsLoggedIn) {
      if (isAdmin) {
        const token = cookies.get('userToken')
        if (token) {
          const decodedToken = jwtDecode(token)
          if (!decodedToken.roles.includes(RoleEnum.ADMIN)) {
            navigateTo(from)
          }
        }
      }
    } else if (isAuth && !$authStore.getIsLoggedIn) {
      navigateTo({
        name: 'login',
      })
    }

    // const { $userStore } = useNuxtApp()
    // if (to.meta.isAuth && !$userStore().isLoggedIn) {
    //   return navigateTo({
    //     name: 'Admin',
    //   })
    // }
  }
})

