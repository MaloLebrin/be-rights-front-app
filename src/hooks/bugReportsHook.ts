import API, { PaginatedResponse } from "@/helpers/api"
import { useBugStore, useUiStore, useUserStore } from "@/store"
import { BugReportType, BugReportTypeEnum, BugReportTypeTranslation } from "@/store/typesExported"

export function bugReportsHook() {
  const bugStore = useBugStore()
  const userStore = useUserStore()
  const { setUIErrorToast, IncLoading, DecLoading } = useUiStore()
  const api = new API(userStore.getCurrentUserToken!)

  async function fetchAll(url?: string) {
    IncLoading()
    try {
      let finalUrl = 'bugreport'
      if (url) {
        finalUrl += `${url}`
      }
      const res = await api.get(finalUrl)
      const { data }: PaginatedResponse<BugReportType> = res
      const bugs = data.filter(bug => !bugStore.getAllIds.includes(bug.id))
      if (bugs.length > 0) {
        bugStore.createMany(bugs)
      }
    } catch (error) {
      console.error(error)
      setUIErrorToast()
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
      bugStore.createOne(data)
      return data
    } catch (error) {
      console.error(error)
      setUIErrorToast()
    }
  }

  return {
    fetchAll,
    getBugReportTypeTranslation,
    postOne,
  }
}