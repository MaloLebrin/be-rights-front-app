import { useCookies } from 'vue3-cookies'
import axiosInstance from '@/axios.config'
import type { PaginatedResponse } from '@/helpers/api'
import APi from '@/helpers/api'
import type { ThemeEnum } from '@/types'
import { RoleEnum } from '@/types'
import type { EmployeeType, EventType, FileType, UserType } from '@/types/typesExported'

export default function userHook() {
  const userStore = useUserStore()
  const mainStore = useMainStore()
  const eventStore = useEventStore()
  const fileStore = useFileStore()
  const { setUIErrorToast, setUISucessToast, IncLoading, DecLoading } = useUiStore()
  const { storeEmployeeRelationsEntities } = employeeHook()
  const { cookies } = useCookies()
  const api = new APi(userStore.getCurrentUserToken!)
  const router = useRouter()

  async function login({ email, password }: { email: string; password: string }) {
    try {
      IncLoading()
      const res = await axiosInstance.post('user/login', { email, password })
      const user = res.data as UserType
      storeUsersEntities(user)
      cookies.set('userToken', user.token)
      if (user && userStore.isCurrentUserAdmin) {
        router.push({ name: 'admin.events' })
      } else {
        router.push({ name: 'user.events' })
      }
      setUISucessToast('Vous êtes connecté')
      mainStore.setIsLoggedIn()
    } catch (error) {
      console.error(error)
      setUIErrorToast()
    }
    DecLoading()
  }

  async function register({ companyName, email, password, firstName, lastName, roles }: { companyName: string; email: string; password: string; firstName: string; lastName: string; roles: RoleEnum }) {
    try {
      IncLoading()
      const res = await axiosInstance.post('user', { companyName, email, password, firstName, lastName, roles })
      const user = res.data as UserType
      storeUsersEntities(user)
      cookies.set('userToken', user.token)
      if (user && userStore.isCurrentUserAdmin) {
        router.push({ name: 'admin.events' })
      } else {
        router.push({ name: 'user.events' })
      }
      setUISucessToast('Vous êtes inscrit avec succès')
      mainStore.setIsLoggedIn()
    } catch (error) {
      console.error(error)
      setUIErrorToast()
    }
    DecLoading()
  }

  async function fetchOne(userId: number) {
    try {
      IncLoading()
      const res = await api.get(`user/${userId}`)
      const user = res.data as UserType
      if (user) {
        storeUsersEntities(user)
      }
    } catch (error) {
      console.error(error)
      setUIErrorToast()
    }
  }

  function storeUsersEntities(user: UserType, isUserToSetCurrent = true) {
    if (user.events && user.events.length > 0) {
      const userEvents = user.events as EventType[]
      const eventsToStore = userEvents.filter(event => !eventStore.getAllIds.includes(event.id))
      eventStore.createMany(eventsToStore)
      user.events = eventsToStore.map(event => event.id)
    }
    if (user.employee && user.employee.length > 0) {
      const employeesToStore = storeEmployeeRelationsEntities(user.employee.map(e => ({
        ...e as EmployeeType,
        createdByUser: user.id,
      })))
      user.employee = employeesToStore.map(employee => employee.id)
    }
    if (user.files && user.files.length > 0) {
      const files = user.files as FileType[]
      const filesToStore = files.filter(file => !fileStore.getAllIds.includes(file.id))
      fileStore.createMany(filesToStore)
      user.files = filesToStore.map(file => file.id)
    }
    if (isUserToSetCurrent) {
      userStore.setCurrent(user)
    }
    if (userStore.getAllIds.includes(user.id)) {
      userStore.updateOne(user.id, user)
    } else {
      userStore.createOne(user)
    }
  }

  function storeUsersEntitiesForManyUsers(users: UserType[]): void {
    if (users.length > 0) {
      const events = users.reduce((acc, user) => [...acc, ...user.events as EventType[]], [] as EventType[])
      const eventsToStore = events.filter(event => !eventStore.getAllIds.includes(event.id))
      if (eventsToStore.length > 0) {
        eventStore.createMany(eventsToStore)
      }

      const employees = users.reduce((acc, user) => [...acc, ...user.employee as EmployeeType[]], [] as EmployeeType[])
      storeEmployeeRelationsEntities(employees)

      const files = users.reduce((acc, user) => [...acc, ...user.files as FileType[]], [] as FileType[])
      const filesToStore = files.filter(file => !fileStore.getAllIds.includes(file.id))
      if (filesToStore.length > 0) {
        fileStore.createMany(filesToStore)
      }

      const missingsUsers = users.filter(user => !userStore.getAllIds.includes(user.id))
      if (missingsUsers.length > 0) {
        const usersToStore = missingsUsers.map(user => {
          const userEvents = user.events as EventType[]
          const userEmployees = user.employee as EmployeeType[]
          const userFiles = user.files as FileType[]
          return {
            ...user,
            events: userEvents.map(event => event.id),
            employee: userEmployees.map(employee => employee.id),
            files: userFiles.map(file => file.id),
          }
        })
        userStore.createMany(usersToStore)
      }
    }
  }

  async function userToggleTheme(theme: ThemeEnum) {
    try {
      IncLoading()
      const id = userStore.entities.current?.id
      if (id) {
        const res = await api.patch(`user/theme/${id}`, { theme })
        userStore.updateOne(id, res as UserType)
      }
    } catch (error) {
      console.error(error)
      setUIErrorToast()
    }
    DecLoading()
  }

  async function fetchAll(url?: string) {
    IncLoading()
    try {
      let finalUrl = 'user'
      if (url) {
        finalUrl += `${url}`
      }
      const res = await api.get(finalUrl)
      const { data }: PaginatedResponse<UserType> = res
      storeUsersEntitiesForManyUsers(data)
    } catch (error) {
      setUIErrorToast()
      console.error(error)
    }
    DecLoading()
  }

  async function deleteUser(id: number) {
    try {
      IncLoading()
      await api.delete(`user/${id}`)
      userStore.deleteOne(id)
      setUISucessToast('Utilisateurs à été supprimé avec succès')
    } catch (error) {
      setUIErrorToast()
      console.error(error)
    }
    DecLoading()
  }

  async function patchOne(id: number, user: UserType) {
    IncLoading()
    try {
      const res = await api.patch(`user/${id}`, { user })
      userStore.updateOne(id, res as UserType)
      setUISucessToast('Utilisateur à été modifié avec succès')
    } catch (error) {
      setUIErrorToast()
      console.error(error)
    }
    DecLoading()
  }

  function getRoleTranslation(role: RoleEnum) {
    switch (role) {
      case RoleEnum.ADMIN:
        return 'Administrateur'
      case RoleEnum.USER:
        return 'Utilisateur'
      case RoleEnum.EMPLOYEE:
        return 'Destinataire'
      case RoleEnum.SUPER_USER:
        return 'Super utilisateur'
      case RoleEnum.COMPANY:
        return 'Entreprise'
      case RoleEnum.PHOTOGRAPHER:
        return 'Photographe'
      case RoleEnum.CUSTOMER:
        return 'Client'
      default:
        return 'Utilisateur'
    }
  }

  function getUserfullName(user: UserType) {
    return `${user.firstName} ${user.lastName}`
  }

  return {
    deleteUser,
    fetchAll,
    fetchOne,
    getRoleTranslation,
    getUserfullName,
    login,
    patchOne,
    register,
    storeUsersEntities,
    userToggleTheme,
  }
}
