import API from '@/helpers/api'
import type { AnswerType } from '@/types/typesExported'

export default function answerHook() {
  const answerStore = useAnswerStore()
  const { IncLoading, DecLoading } = useUiStore()
  const toast = useToast()
  const api = new API()

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
        toast.error('Une erreur est survenue')
      }
    } else {
      toast.error('Veuillez sélectionner au moins un participant et un événement')
    }
    DecLoading()
  }

  function filteringAnswersNotInStore(answers: AnswerType[]) {
    if (answers.length > 0) {
      return answers.filter(answer => !answerStore.isAlreadyInStore(answer.id))
    }
    return []
  }

  async function fetchManyAnswerForEvent(eventId: number) {
    IncLoading()
    try {
      const res = await api.get(`answer/event/${eventId}`)
      const answers = res as AnswerType[]
      const answersNotInStore = filteringAnswersNotInStore(answers)
      if (answersNotInStore.length > 0) {
        answerStore.createMany(answersNotInStore)
      }
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  return {
    postMany,
    filteringAnswersNotInStore,
    fetchManyAnswerForEvent,
  }
}
