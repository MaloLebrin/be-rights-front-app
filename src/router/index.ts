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
  const userStore = useUserStore()
  const { cookies } = useCookies()
  // const { loginWithToken } = authHook()

  const { isAuth, isAdmin } = to.meta
  let token: string | null = null

  if (!isAuth) {
    return next()
  }

  if (isAuth && !userStore.getCurrent) {
    token = cookies.get('token')
    if (token) {
      // await loginWithToken(token)
      if (userStore.getCurrent) {
        if (!isAdmin) {
          return next()
        }
        if (isAdmin && userStore.isCurrentUserAdmin) {
          return next()
        }
        return next(to)
      }
    } else {
      return next({
        name: 'login',
      })
    }
  }
  if (isAuth && userStore.getCurrent) {
    if (!isAdmin) {
      return next()
    }
    if (isAdmin && userStore.isCurrentUserAdmin) {
      return next()
    }
    return next(to)
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
