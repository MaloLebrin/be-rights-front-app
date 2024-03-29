import type { PaginatedResponse } from '@/helpers/api'
import API from '@/helpers/api'
import type { AnswerType, EmployeeType, FileType } from '@/types'
import { isArrayOfNumbers, uniq } from '@/utils'

export default function employeeHook() {
  const employeeStore = useEmployeeStore()
  const userStore = useUserStore()
  const { createMany: createManyAnswers } = useAnswerStore()
  const { createMany: createManyFiles } = useFileStore()
  const { IncLoading, DecLoading } = useUiStore()
  const addressStore = useAddressStore()
  const { createOne: createOneAddress } = addressStore
  const { filteringFilesNotInStore } = fileHook()
  const { filteringAnswersNotInStore } = answerHook()
  const { isAddressType } = addressHook()
  const toast = useToast()
  const api = new API()

  function getEmployeeStatusSignature(employee: EmployeeType): string {
    if (employee.hasSigned) {
      return 'Accepté'
    } else {
      if (employee.signedAt) {
        return 'Refusé'
      }
      return 'En attente'
    }
  }

  function getEmployeeStatusColor(employee: EmployeeType): string {
    if (employee.hasSigned) {
      return 'text-green'
    } else {
      if (employee.signedAt) {
        return 'text-red'
      }
      return 'text-orange'
    }
  }

  function storeEmployeeRelationsEntities(employees: EmployeeType[]): EmployeeType[] {
    if (employees.length > 0) {
      const missingIds = employees.map(employee => employee.id).filter(id => !employeeStore.isAlreadyInStore(id))
      if (missingIds.length > 0) {
        // TODO : optimize this with reduce
        const employeesToStore = employees.filter(employee => missingIds.includes(employee.id)).map(employee => {
          let employeeAnswers: AnswerType[] = []
          let employeeFiles: FileType[] = []

          if (employee.files && employee.files.length > 0 && !isArrayOfNumbers(employee.files)) {
            employeeFiles = filteringFilesNotInStore(employee.files as FileType[])
            if (employeeFiles.length > 0) {
              createManyFiles(employeeFiles)
            }
          }

          if (employee.answers && employee.answers.length > 0 && !isArrayOfNumbers(employee.answers)) {
            employeeAnswers = filteringAnswersNotInStore(employee.answers as AnswerType[])
            if (employeeAnswers.length > 0) {
              createManyAnswers(employeeAnswers)
            }
          }
          if (employee.address && isAddressType(employee.address)) {
            if (!addressStore.isAlreadyInStore(employee.address.id)) {
              createOneAddress(employee.address)
            }
            employee.address = employee.address.id
          }

          return {
            ...employee,
            answers: employeeAnswers.map(answer => answer.id),
            files: employeeFiles.map(file => file.id),
          }
        })
        employeeStore.createMany(employeesToStore)
        return employeesToStore
      }
    }
    return []
  }

  async function getEmployeesByEventId(eventId: number) {
    try {
      const res: any = await api.get(`employee/event/${eventId}`)
      const employeeArray = res.data as EmployeeType[]
      const employees: EmployeeType[] = employeeArray.map(employe => ({
        ...employe,
        event: eventId,
      }))
      employeeStore.createMany(employees)
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
    }
  }

  async function fetchAllByUserId(userId: number) {
    IncLoading()
    try {
      const res = await api.get(`employee/user/${userId}`)
      const data = res as EmployeeType[]
      storeEmployeeRelationsEntities(data.map(employee => ({
        ...employee,
        createdByUser: userId,
      })))
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function fetchAll(url?: string) {
    IncLoading()
    try {
      let finalUrl = 'employee'
      if (url) {
        finalUrl += `${url}`
      }

      const res = await api.get(`${finalUrl}`)
      const { data }: PaginatedResponse<EmployeeType> = res
      storeEmployeeRelationsEntities(data)
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function deleteOne(id: number) {
    IncLoading()
    try {
      await api.delete(`employee/${id}`)
      employeeStore.deleteOne(id)
      toast.success('Destinataire supprimé avec succès')
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function patchOne(id: number, data: EmployeeType) {
    IncLoading()
    try {
      const res = await api.patch(`employee/${id}`, { employee: data })
      employeeStore.updateOne(id, res)
      toast.success('Destinataire modifié avec succès')
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function postOne(employee: EmployeeType, userId: number) {
    try {
      const res = await api.post(`employee/${userId}`, { employee })
      const data = res as EmployeeType
      const user = userStore.getOne(userId)
      const userEmployee = user.employee as number[]
      userStore.updateOne(userId, {
        ...user,
        employee: [...userEmployee, data.id],
      })
      employeeStore.createOne(data)
      toast.success('Destinataire créé avec succès')
      return data
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
    }
  }

  async function postManyForEvent(employees: EmployeeType[], eventId: number, userId: number) {
    IncLoading()
    try {
      const res = await api.post<EmployeeType[]>(`employee/manyonevent/${eventId}/${userId}`, employees)
      const data = res as EmployeeType[]
      const employeeIds = data.map(employee => employee.id)
      const user = userStore.getOne(userId)
      const userEmployee = user.employee as number[]
      userStore.updateOne(userId, {
        ...user,
        employee: uniq([...userEmployee, ...employeeIds]),
      })
      employeeStore.createMany(data)
      toast.success('Destinataires créés avec succès')
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  function getEmployeeFullname(employee: EmployeeType): string {
    let str = ''
    if (employee?.firstName)
      str += employee.firstName
    if (employee?.lastName)
      str += ` ${employee.lastName}`
    return str
  }

  return {
    deleteOne,
    fetchAll,
    fetchAllByUserId,
    getEmployeeFullname,
    getEmployeesByEventId,
    getEmployeeStatusColor,
    getEmployeeStatusSignature,
    patchOne,
    postManyForEvent,
    postOne,
    storeEmployeeRelationsEntities,
  }
}
