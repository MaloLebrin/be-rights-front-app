import Index from '@/pages/userDashboard/index.vue'

export const userRoutes = [
  {
    path: '/user/events',
    name: 'user.events',
    component: Index,
    meta: {
      layout: 'DashboardLayout',
      isAuth: true,
      isAdmin: false,
    },
  },
  {
    path: '/user/events/:eventId/show',
    name: 'user.events.show',
    component: () => import('@/pages/userDashboard/EventId.vue'),
    meta: {
      layout: 'DashboardLayout',
      isAuth: true,
      isAdmin: false,
    },
  },
  {
    path: '/user/events/create',
    name: 'user.events.create',
    component: () => import('@/pages/userDashboard/CreateEvent.vue'),
    meta: {
      layout: 'DashboardLayout',
      isAuth: true,
      isAdmin: false,
    },//TODO find a way to have a params to have mode in eventForm
  },
  {
    path: '/user/bug-report/create',
    name: 'user.bug.create',
    component: () => import('@/pages/userDashboard/bugReports/BugReport.vue'),
    meta: {
      layout: 'DashboardLayout',
      isAuth: true,
      isAdmin: false,
    },
  },
  {
    path: '/user/employees',
    name: 'user.employees',
    component: () => import('@/pages/userDashboard/MyEmployees.vue'),
    meta: {
      layout: 'DashboardLayout',
      isAuth: true,
      isAdmin: false,
    },
  },
  {
    path: '/user/employees/create',
    name: 'user.employees.create',
    component: () => import('@/pages/userDashboard/CreateEmployee.vue'),
    meta: {
      layout: 'DashboardLayout',
      isAuth: true,
      isAdmin: false,
    },
  },
  {
    path: '/user/files',
    name: 'user.files',
    component: () => import('@/pages/userDashboard/MyFiles.vue'),
    meta: {
      layout: 'DashboardLayout',
      isAuth: true,
      isAdmin: false,
    },
  },
  {
    path: '/user/files/create-model',
    name: 'user.files.create-model',
    component: () => import('@/pages/userDashboard/CreateModel.vue'),
    meta: {
      layout: 'DashboardLayout',
      isAuth: true,
      isAdmin: false,
    },
  },
  {
    path: '/user/account',
    name: 'user.account',
    component: () => import('@/pages/userDashboard/MyUserAccount.vue'),
    meta: {
      layout: 'DashboardLayout',
      isAuth: true,
      isAdmin: false,
    },
  },
]
