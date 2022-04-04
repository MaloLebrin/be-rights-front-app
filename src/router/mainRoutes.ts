import Index from '@/pages/Index.vue'

export const mainRoutes = [
  {
    path: '/',
    name: 'home',
    component: Index,
    meta: {
      layout: 'DefaultLayout',
      isAuth: false,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login.vue'),
    meta: {
      layout: 'DefaultLayout',
      isAuth: false,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/register.vue'),
    meta: {
      layout: 'DefaultLayout',
      isAuth: false,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/pages/404.vue'),
    meta: {
      layout: 'DefaultLayout',
      isAuth: false,
    },
  },
]
