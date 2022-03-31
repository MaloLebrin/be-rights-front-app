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

//TODO fix this
// router.beforeEach((to, from, next) => {
//   const mainStore = useMainStore()
//   if (to.name !== 'login' && !mainStore.getIsLoggedIn) next({ name: 'login' })
//   else next()
// })

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