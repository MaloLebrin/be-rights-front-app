import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
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

  const { isAuth, isAdmin } = to.meta
  if (!isAuth) {
    return next()
  }
  console.log(userStore.getCurrentUserId, '<==== userStore.getCurrentUserId')
  if (isAuth) {
    if (userStore.getCurrent) {
      if (!isAdmin) {
        return next()
      }
      if (isAdmin && userStore.isCurrentUserAdmin) {
        return next()
      }
      return next()
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
