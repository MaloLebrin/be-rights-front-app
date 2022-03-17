import API from "@/helpers/api"
import { AnswerType } from "@/types/typesExported"

export default function answerHook() {
  const { getCurrentUserToken } = useUserStore()
  const answerStore = useAnswerStore()
  const { setUIErrorToast, setUIErrorToastWithMessage, IncLoading, DecLoading } = useUiStore()
  const api = new API(getCurrentUserToken!)

  async function postMany(eventId: number, employeeIds: number[]) {
    IncLoading()
    if (eventId && employeeIds.length > 0) {
      try {
        const res = await api.post('answer/many', { eventId, employeeIds })
        const answers = res as AnswerType[]
        if (answers.length > 0) {
          answerStore.createMany(answers)
        }
      } catch (error) {
        console.error(error)
        setUIErrorToast()
      }
    } else {
      setUIErrorToastWithMessage('Veuillez sélectionner au moins un participant et un événement')
    }
    DecLoading()
  }

  function filteringAnswersNotInStore(answers: AnswerType[]) {
    if (answers.length > 0) {
      return answers.filter(answer => !answerStore.getAllIds.includes(answer.id))
    }
    return []
  }

  return {
    postMany,
    filteringAnswersNotInStore,
  }
}
