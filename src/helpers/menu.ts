import {
  HomeIcon,
  UserGroupIcon,
  UsersIcon,
  FolderOpenIcon,
  ExclamationCircleIcon,
  PlusIcon,
  FolderAddIcon,
} from '@heroicons/vue/outline'

export const MENU_ITEMS = [
  {
    label: 'Événements',
    icon: HomeIcon,
    linkName: 'admin.events',
    isAdmin: true,
  },
  {
    label: 'Utilisateurs',
    icon: UserGroupIcon,
    linkName: 'admin.users',
    isAdmin: true,
  },
  {
    label: 'Destinataires',
    icon: UsersIcon,
    linkName: 'admin.employees',
    isAdmin: true,
  },
  {
    label: 'Fichiers',
    icon: FolderOpenIcon,
    linkName: 'admin.files',
    isAdmin: true,
  },
  {
    label: 'Bugs et Problèmes',
    icon: ExclamationCircleIcon,
    linkName: 'admin.bugs',
    isAdmin: true,
  },
  {
    label: 'Créer un destinataire',
    icon: PlusIcon,
    linkName: null,
    isAdmin: true,
  },
  {
    label: 'Créer un nouveau fichier',
    icon: FolderAddIcon,
    linkName: null,
    isAdmin: true,
  },
  // user
  {
    label: 'Événements',
    icon: HomeIcon,
    linkName: 'user.events',
    isAdmin: false,
  },
  {
    label: 'Destinataires',
    icon: UsersIcon,
    linkName: 'user.employees',
    isAdmin: false,
  },
  {
    label: 'Fichiers',
    icon: FolderOpenIcon,
    linkName: 'user.files',
    isAdmin: false,
  },
  {
    label: 'Créer un événement',
    icon: PlusIcon,
    linkName: 'user.events.create',
    isAdmin: false,
  },
  {
    label: 'Créer un destinataire',
    icon: PlusIcon,
    linkName: 'user.employees.create',
    isAdmin: false,
  },
  {
    label: 'Créer un nouveau fichier',
    icon: FolderAddIcon,
    linkName: 'user.files.create-model',
    isAdmin: false,
  },
]
