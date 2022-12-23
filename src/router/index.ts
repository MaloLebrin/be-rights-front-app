import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { useCookies } from 'vue3-cookies'
import { mainRoutes } from './mainRoutes'
import { userRoutes } from './userRoutes'
import { adminRoutes } from './adminRoutes'
import { RoleEnum } from '@/types'

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
  const { isAuth, isAdmin } = to.meta
  const { cookies } = useCookies()
  const { jwtDecode } = authHook()

  if (!isAuth) {
    return next()
  } else {
    const token = cookies.get('userToken')
    if (token) {
      const decodedToken = jwtDecode(token)
      if (!isAdmin) {
        return next()
      } else if (isAdmin && decodedToken?.roles.includes(RoleEnum.ADMIN)) {
        return next()
      }
    }
    return next({
      name: 'login',
    })
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
