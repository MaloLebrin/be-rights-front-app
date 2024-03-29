import Index from '@/pages/adminDashboard/event/index.vue'

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
    component: () => import('@/pages/adminDashboard/event/EventDetail.vue'),
    meta: {
      layout: 'AdminDashboardLayout',
      isAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/admin/events/:eventId/edit',
    name: 'admin.events.edit',
    component: () => import('@/pages/adminDashboard/event/EventId.vue'),
    meta: {
      layout: 'AdminDashboardLayout',
      isAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/admin/events/create',
    name: 'admin.events.create',
    component: () => import('@/pages/adminDashboard/event/CreateEvent.vue'),
    meta: {
      layout: 'AdminDashboardLayout',
      isAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/admin/users',
    name: 'admin.users',
    component: () => import('@/pages/adminDashboard/user/users.vue'),
    meta: {
      layout: 'AdminDashboardLayout',
      isAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/admin/users/:userId/details',
    name: 'admin.users.show',
    component: () => import('@/pages/adminDashboard/user/UserDetail.vue'),
    meta: {
      layout: 'AdminDashboardLayout',
      isAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/admin/users/:userId/edit',
    name: 'admin.users.edit',
    component: () => import('@/pages/adminDashboard/user/UserId.vue'),
    meta: {
      layout: 'AdminDashboardLayout',
      isAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/admin/employees',
    name: 'admin.employees',
    component: () => import('@/pages/adminDashboard/employee/Employees.vue'),
    meta: {
      layout: 'AdminDashboardLayout',
      isAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/admin/employees/:employeeId/details',
    name: 'admin.employees.details',
    component: () => import('@/pages/adminDashboard/employee/EmployeeId.vue'),
    meta: {
      layout: 'AdminDashboardLayout',
      isAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/admin/employees/create',
    name: 'admin.employees.create',
    component: () => import('@/pages/userDashboard/employee/CreateEmployee.vue'),
    meta: {
      layout: 'DashboardLayout',
      isAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/admin/files',
    name: 'admin.files',
    component: () => import('@/pages/adminDashboard/file/Files.vue'),
    meta: {
      layout: 'AdminDashboardLayout',
      isAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/admin/files/create',
    name: 'admin.files.create',
    component: () => import('@/pages/adminDashboard/file/CreateOne.vue'),
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
  {
    path: '/admin/newsletter',
    name: 'admin.newsletter',
    component: () => import('@/pages/adminDashboard/newsletter/index.vue'),
    meta: {
      layout: 'AdminDashboardLayout',
      isAuth: true,
      isAdmin: true,
    },
  },
]
