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

router.beforeResolve(async (to, _from, next) => {
  const userStore = useUserStore()
  const { getUserWithTokenFromAPI } = userStore
  const { cookies } = useCookies()

  const { isAuth, isAdmin } = to.meta
  if (!isAuth) {
    return next()
  } else {
    if (userStore.getCurrent) {
      if (!isAdmin) {
        return next()
      } else if (isAdmin && userStore.isCurrentUserAdmin) {
        return next()
      } else {
        return next()
      }
    } else {
      const token = cookies.get('userToken')
      if (token) {
        await getUserWithTokenFromAPI(token)
        if (userStore.getCurrent) {
          if (!isAdmin) {
            return next()
          } else if (isAdmin && userStore.isCurrentUserAdmin) {
            return next()
          } else {
            return next()
          }
        }
      }
    }
  }
  return next({
    name: 'login',
  })
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
