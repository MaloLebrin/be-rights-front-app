import { createRouter, createWebHistory } from 'vue-router'
// import generatedRoutes from 'virtual:generated-pages'
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


export default router