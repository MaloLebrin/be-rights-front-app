import API, { PaginatedResponse } from "@/helpers/api"
import { useEmployeeStore, useUiStore, useUserStore, useAnswerStore, useFileStore } from "@/store"
import { answerHook, fileHook } from "."
import { FileType, EmployeeType, AnswerType } from "@/store/typesExported"

export function employeeHook() {
  const employeeStore = useEmployeeStore()
  const userStore = useUserStore()
  const { createMany: createManyAnswers } = useAnswerStore()
  const { createMany: createManyFiles } = useFileStore()
  const { setUISucessToast, setUIErrorToast, IncLoading, DecLoading } = useUiStore()
  const { filteringFilesNotInStore } = fileHook()
  const { filteringAnswersNotInStore } = answerHook()
  const api = new API(userStore.entities.current?.token!)

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

  function storeEmployeeRelationsEntities(employees: EmployeeType[]) {
    if (employees.length > 0) {
      const ids = employees.map(employee => employee.id).filter(id => !employeeStore.getAllIds.includes(id))
      if (ids.length > 0) {
        // TODO : see to optimize this with reduce
        const employeesToStore = employees.filter(employee => ids.includes(employee.id)).map(employee => {
          let employeeAnswers: AnswerType[] = []
          let employeeFiles: FileType[] = []

          if (employee.files && employee.files.length > 0) {
            employeeFiles = filteringFilesNotInStore(employee.files as FileType[])
            if (employeeFiles.length > 0) {
              createManyFiles(employeeFiles)
            }
          }

          if (employee.answers && employee.answers.length > 0) {
            employeeAnswers = filteringAnswersNotInStore(employee.answers as AnswerType[])
            if (employeeAnswers.length > 0) {
              createManyAnswers(employeeAnswers)
            }
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
      setUISucessToast('Les employés ont été récupérés avec succès')
    } catch (error) {
      console.error(error)
      setUIErrorToast()
    }
  }

  async function fetchAllByUserId(userId: number) {
    IncLoading()
    try {
      const res = await api.get(`employee/user/${userId}`)
      const data = res as EmployeeType[]
      storeEmployeeRelationsEntities(data)
      setUISucessToast('Destinataires récupéré avec succès')
    } catch (error) {
      console.error(error)
      setUIErrorToast()
    }
    DecLoading()
  }

  async function fetchAll(perPage?: number) {
    IncLoading()
    try {
      let url = `employee`

      if (perPage) {
        url += `?limit=${perPage}`
      }

      const res = await api.get(url)
      const { currentPage, data, limit, total }: PaginatedResponse<EmployeeType> = res
      storeEmployeeRelationsEntities(data)
      setUISucessToast('Destinataires récupéré avec succès')
    } catch (error) {
      console.error(error)
      setUIErrorToast()
    }
    DecLoading()
  }

  async function deleteOne(id: number) {
    IncLoading()
    try {
      await api.delete(`employee/${id}`)
      employeeStore.deleteOne(id)
      //fix deletion in store
      setUISucessToast('Destinataire supprimé avec succès')
    } catch (error) {
      console.error(error)
      setUIErrorToast()
    }
    DecLoading()
  }

  async function patchOne(id: number, data: EmployeeType) {
    IncLoading()
    try {
      const res = await api.patch(`employee/${id}`, { employee: data })
      employeeStore.updateOne(id, res)
      setUISucessToast('Destinataire modifié avec succès')
    } catch (error) {
      console.error(error)
      setUIErrorToast()
    }
    DecLoading()
  }


  return {
    deleteOne,
    fetchAll,
    fetchAllByUserId,
    getEmployeeStatusSignature,
    getEmployeeStatusColor,
    getEmployeesByEventId,
    patchOne,
    storeEmployeeRelationsEntities,
  }
}