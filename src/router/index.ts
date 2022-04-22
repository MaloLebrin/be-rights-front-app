import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { useCookies } from 'vue3-cookies'
import { mainRoutes } from './mainRoutes'
import { userRoutes } from './userRoutes'
import { adminRoutes } from './adminRoutes'

const routes = setupLayouts([
  ...mainRoutes,
  ...userRoutes,
  ...adminRoutes,
])

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeResolve((to, _from, next) => {
  const mainStore = useMainStore()
  const { setIsLoggedIn } = useMainStore()
  const userStore = useUserStore()
  const { cookies } = useCookies()

  const { isAuth, isAdmin } = to.meta
  let token: string | null = null

  if (!isAuth) {
    return next()
  }

  if (isAuth && !mainStore.getIsLoggedIn) {
    token = cookies.get('token')
    if (token) {
      setIsLoggedIn()
    } else {
      return {
        name: 'login',
      }
    }
  }
  if (isAuth && mainStore.getIsLoggedIn) {
    if (!isAdmin) {
      return next()
    }
    if (isAdmin && userStore.isCurrentUserAdmin) {
      return next()
    }
    return false
  }
})

declare module 'vue-router' {
  interface RouteMeta {
    // must be declared by every route
    layout: string
    isAuth: boolean
    // is optional
    isAdmin?: boolean
  }
}

export default router
