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

router.beforeResolve((to, from, next) => {
  const mainStore = useMainStore()
  const userStore = useUserStore()
  console.log(to, 'to')
  if (to.meta.isAuth) {
    if (!mainStore.getIsLoggedIn) {
      console.log(to.meta, 'to.meta')
      return {
        name: 'login',
      }
    }
    if (to.meta.isAdmin && userStore.isCurrentUserAdmin) {
      return next()
    }
    return next()
  }
  return next()
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
