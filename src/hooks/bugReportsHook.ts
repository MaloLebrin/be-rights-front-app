import type { PaginatedResponse } from '@/helpers/api'
import API from '@/helpers/api'
import type { BugReportType, BugReportTypeEnum } from '@/types/typesExported'
import { BugReportTypeTranslation } from '@/types/typesExported'

export default function bugReportsHook() {
  const bugStore = useBugStore()
  const { IncLoading, DecLoading } = useUiStore()
  const toast = useToast()
  const api = new API()

  async function fetchAll(url?: string) {
    IncLoading()
    try {
      let finalUrl = 'bugreport'
      if (url) {
        finalUrl += `${url}`
      }
      const res = await api.get(finalUrl)
      const { data }: PaginatedResponse<BugReportType> = res
      const bugs = data.filter(bug => !bugStore.isAlreadyInStore(bug.id))
      if (bugs.length > 0) {
        bugStore.createMany(bugs)
      }
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  function getBugReportTypeTranslation(type: BugReportTypeEnum) {
    return BugReportTypeTranslation[type]
  }

  async function postOne(bugReport: Partial<BugReportType>) {
    try {
      const res = await api.post('bugreport', { bugReport })
      const data = res as BugReportType
      if (data) {
        bugStore.createOne(data)
      }
      toast.success('Le rapport de bug a bien été envoyé')
      return data
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
    }
  }

  return {
    fetchAll,
    getBugReportTypeTranslation,
    postOne,
  }
}
