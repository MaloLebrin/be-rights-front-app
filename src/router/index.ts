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

console.log(routes, 'routes')

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const mainStore = useMainStore()
  const userStore = useUserStore()
  if (to.meta.isAuth && (!mainStore.getIsLoggedIn || !userStore.getCurrentUserId)) {
    return {
      name: 'login',
    }
  }
  if (to.meta.isAdmin && !userStore.isCurrentUserAdmin) {
    if (from.name) {
      return {
        name: from.name,
      }
    }
    return {
      name: 'home',
    }
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