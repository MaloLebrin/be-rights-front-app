import Index from '@/pages/adminDashboard/index.vue'

export const adminRoutes = [
  {
    path: '/admin/events',
    name: 'admin.events',
    component: Index,
    meta: {
      layout: 'AdminDashboardLayout',
      isAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/admin/events/:eventId/show',
    name: 'admin.events.show',
    component: () => import('@/pages/adminDashboard/EventId.vue'),
    meta: {
      layout: 'AdminDashboardLayout',
      isAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/admin/users',
    name: 'admin.users',
    component: () => import('@/pages/adminDashboard/users.vue'),
    meta: {
      layout: 'AdminDashboardLayout',
      isAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/admin/employees',
    name: 'admin.employees',
    component: () => import('@/pages/adminDashboard/Employees.vue'),
    meta: {
      layout: 'AdminDashboardLayout',
      isAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/admin/files',
    name: 'admin.files',
    component: () => import('@/pages/adminDashboard/Files.vue'),
    meta: {
      layout: 'AdminDashboardLayout',
      isAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/admin/account',
    name: 'admin.account',
    component: () => import('@/pages/adminDashboard/myAccount.vue'),
    meta: {
      layout: 'AdminDashboardLayout',
      isAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/admin/bugs',
    name: 'admin.bugs',
    component: () => import('@/pages/adminDashboard/bugReports/BugsReports.vue'),
    meta: {
      layout: 'AdminDashboardLayout',
      isAuth: true,
      isAdmin: true,
    },
  },
]
