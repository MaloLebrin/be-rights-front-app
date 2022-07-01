import { useCookies } from 'vue3-cookies'
import axiosInstance from '@/axios.config'
import type { PaginatedResponse } from '@/helpers/api'
import APi from '@/helpers/api'
import type { ThemeEnum } from '@/types'
import { RoleEnum } from '@/types'
import type { EmployeeType, EventType, FileType, UserType } from '@/types/typesExported'
import { hasOwnProperty, isArrayOfNumbers, noNull } from '@/utils'

export default function userHook() {
  const userStore = useUserStore()
  const eventStore = useEventStore()
  const fileStore = useFileStore()
  const toast = useToast()
  const { IncLoading, DecLoading } = useUiStore()
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
      redirectBaseOneCurrentUserRole()
      toast.success('Connexion réussie, bienvenue !')
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
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
      redirectBaseOneCurrentUserRole()
      toast.success('Vous êtes inscrit avec succès')
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
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
      toast.error('Une erreur est survenue')
    }
  }

  /**
   * function to store all objetcs or arrays user's entities, and set user to current
   * @param user
   * @param isUserToSetCurrent
   */
  function storeUsersEntities(user: UserType, isUserToSetCurrent = true) {
    if (user.events && user.events.length > 0 && !isArrayOfNumbers(user.events)) {
      const userEvents = user.events as EventType[]
      const eventsToStore = userEvents.filter(event => !eventStore.isAlreadyInStore(event.id))
      eventStore.createMany(eventsToStore)
      user.events = eventsToStore.map(event => event.id)
    }
    if (user.employee && user.employee.length > 0 && !isArrayOfNumbers(user.employee)) {
      const employeesToStore = storeEmployeeRelationsEntities(user.employee.map(e => ({
        ...e as EmployeeType,
        createdByUser: user.id,
      })))
      user.employee = employeesToStore.map(employee => employee.id)
    }
    if (user.files && user.files.length > 0 && !isArrayOfNumbers(user.files)) {
      const files = user.files as FileType[]
      const filesToStore = files.filter(file => !fileStore.isAlreadyInStore(file.id))
      fileStore.createMany(filesToStore)
      user.files = filesToStore.map(file => file.id)
    }
    if (isUserToSetCurrent) {
      userStore.setCurrent(user)
    }
    if (userStore.isAlreadyInStore(user.id)) {
      userStore.updateOne(user.id, user)
    } else {
      userStore.createOne(user)
    }
  }

  function storeUsersEntitiesForManyUsers(users: UserType[]): void {
    if (users.length > 0) {
      const events = users.reduce((acc, user) => [...acc, ...user.events as EventType[]], [] as EventType[])
      const eventsToStore = events.filter(event => !eventStore.isAlreadyInStore(event.id))
      if (eventsToStore.length > 0) {
        eventStore.createMany(eventsToStore)
      }

      const employees = users.reduce((acc, user) => [...acc, ...user.employee as EmployeeType[]], [] as EmployeeType[])
      storeEmployeeRelationsEntities(employees)

      const files = users.reduce((acc, user) => [...acc, ...user.files as FileType[]], [] as FileType[])
      const filesToStore = files.filter(file => !fileStore.isAlreadyInStore(file.id))
      if (filesToStore.length > 0) {
        fileStore.createMany(filesToStore)
      }

      const missingsUsers = users.filter(user => !userStore.isAlreadyInStore(user.id))
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
        if (isUserType(res)) {
          userStore.updateOne(id, res)
        }
      }
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
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
      if (isArrayUserType(data)) {
        storeUsersEntitiesForManyUsers(data)
      }
    } catch (error) {
      toast.error('Une erreur est survenue')
      console.error(error)
    }
    DecLoading()
  }

  async function deleteUser(id: number) {
    try {
      IncLoading()
      await api.delete(`user/${id}`)
      userStore.deleteOne(id)
      toast.success('Utilisateurs à été supprimé avec succès')
    } catch (error) {
      toast.error('Une erreur est survenue')
      console.error(error)
    }
    DecLoading()
  }

  async function patchOne(id: number, user: UserType) {
    IncLoading()
    try {
      const res = await api.patch(`user/${id}`, { user })
      if (isUserType(res)) {
        userStore.updateOne(id, res)
        toast.success('Utilisateur à été modifié avec succès')
      }
    } catch (error) {
      toast.error('Une erreur est survenue')
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
    let str = ''
    if (user.firstName)
      str += user.firstName
    if (user.lastName)
      str += ` ${user.lastName}`
    return str
  }

  async function fetchMany(ids: number[]) {
    IncLoading()
    try {
      if (ids.length > 0) {
        const res = await api.get(`user/many/?ids=${ids.join(',')}`)
        const users = res as UserType[]
        if (users && users.length > 0 && isArrayUserType(users)) {
          const missingsUsers = users.filter(user => !userStore.isAlreadyInStore(user.id))
          if (missingsUsers.length > 0) {
            userStore.createMany(missingsUsers)
          }
        }
      }
    } catch (error) {
      toast.error('Une erreur est survenue')
      console.error(error)
    }
    DecLoading()
  }

  function isUserType(user: any): user is UserType {
    return hasOwnProperty(user, 'id') && hasOwnProperty(user, 'token')
  }

  function isArrayUserType(users: any[]): users is UserType[] {
    return users.every(isUserType)
  }

  /**
   * redirection based on current user's role in store
   */
  function redirectBaseOneCurrentUserRole() {
    if (noNull(userStore.getCurrent)) {
      if (userStore.isCurrentUserAdmin) {
        router.push({ name: 'admin.events' })
      } else {
        router.push({ name: 'user.events' })
      }
    } else {
      router.push({ name: 'login' })
    }
  }

  return {
    deleteUser,
    fetchAll,
    fetchMany,
    fetchOne,
    getRoleTranslation,
    getUserfullName,
    isArrayUserType,
    isUserType,
    login,
    patchOne,
    redirectBaseOneCurrentUserRole,
    register,
    storeUsersEntities,
    userToggleTheme,
  }
}
