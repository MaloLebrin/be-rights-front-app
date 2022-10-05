import {
  ChartPieIcon,
  ExclamationCircleIcon,
  FolderOpenIcon,
  FolderPlusIcon,
  HomeIcon,
  PlusIcon,
  UserGroupIcon,
  UsersIcon,
} from '@heroicons/vue/24/outline'

export const MENU_ITEMS = [
  {
    label: 'Événements',
    icon: HomeIcon,
    linkName: 'adminDashboard-event',
    isAdmin: true,
  },
  {
    label: 'Utilisateurs',
    icon: UserGroupIcon,
    linkName: 'adminDashboard-user-users',
    isAdmin: true,
  },
  {
    label: 'Destinataires',
    icon: UsersIcon,
    linkName: 'adminDashboard-employee-Employees',
    isAdmin: true,
  },
  {
    label: 'Fichiers',
    icon: FolderOpenIcon,
    linkName: 'adminDashboard-file-Files',
    isAdmin: true,
  },
  {
    label: 'Bugs et Problèmes',
    icon: ExclamationCircleIcon,
    linkName: 'adminDashboard-bugReports-BugsReports',
    isAdmin: true,
  },
  {
    label: 'Newsletter Statistiques',
    icon: ChartPieIcon,
    linkName: 'adminDashboard-newsletter',
    isAdmin: true,
  },
  {
    label: 'Créer un événement',
    icon: PlusIcon,
    linkName: 'adminDashboard-event-CreateEvent',
    isAdmin: true,
  },
  {
    label: 'Créer un destinataire',
    icon: PlusIcon,
    linkName: 'userDashboard-employee-CreateEmployee',
    isAdmin: true,
  },

  // user
  {
    label: 'Événements',
    icon: HomeIcon,
    // linkName: 'user.events',
    isAdmin: false,
  },
  {
    label: 'Destinataires',
    icon: UsersIcon,
    linkName: 'userDashboard-employee-MyEmployees',
    isAdmin: false,
  },
  {
    label: 'Fichiers',
    icon: FolderOpenIcon,
    linkName: 'userDashboard-files-MyFiles',
    isAdmin: false,
  },
  {
    label: 'Créer un événement',
    icon: PlusIcon,
    linkName: 'adminDashboard-event-CreateEvent',
    isAdmin: false,
  },
  {
    label: 'Créer un destinataire',
    icon: PlusIcon,
    linkName: 'userDashboard-employee-CreateEmployee',
    isAdmin: false,
  },
  {
    label: 'Créer un nouveau fichier',
    icon: FolderPlusIcon,
    linkName: 'userDashboard-files-CreateModel',
    isAdmin: false,
  },
]
