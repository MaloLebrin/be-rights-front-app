import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'

const routes = setupLayouts(generatedRoutes)
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