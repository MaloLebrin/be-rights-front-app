import type { EventType, EventTypeWithRelations } from '@/store/event/types'
import { EventStatusEnum, getEventStatusTranslationEnum } from '@/store/event/types'
import type { PaginatedResponse } from '@/helpers/api'
import APi from '@/helpers/api'
import type { EmployeeType } from '@/store/employee/types'
import { hasOwnProperty, isArrayOfNumbers, noNull } from '@/utils'

export function eventHook() {
  const eventStore = useEventStore()
  const userStore = useUserStore()
  const { DecLoading, IncLoading } = useUiStore()
  const toast = useToast()
  const api = new APi(userStore.getCurrentUserToken!)

  function getEventStatusTranslation(status: EventStatusEnum) {
    return getEventStatusTranslationEnum[status]
  }

  function getEventStatusColor(status: EventStatusEnum) {
    switch (status) {
      case EventStatusEnum.PENDING:
        return 'text-orange'
      case EventStatusEnum.CREATE:
        return 'dark:text-white-break text-black'
      case EventStatusEnum.CLOSED:
        return 'text-gray-500'
      case EventStatusEnum.COMPLETED:
        return 'text-green'
      default:
        return 'text-gray-500'
    }
  }

  function getSignatureCount(employees: EmployeeType[]) {
    if (employees && employees.length) {
      return employees.filter(employee => noNull(employee.signedAt)).length
    }
    return 0
  }

  function sortEventByDate(events: EventType[]) {
    return events.sort((a, b) => {
      if (a.start < b.start)
        return 1
      if (a.start > b.start)
        return -1
      return 0
    })
  }

  async function fetchAllEvents(url?: string) {
    IncLoading()
    try {
      let finalUrl = 'event'
      if (url) {
        finalUrl += `${url}`
      }
      const res = await api.get(finalUrl)
      const { data }: PaginatedResponse<EventType> = res
      const ids = data.map((event: EventType) => event.id).filter(id => !eventStore.isAlReadyInStore(id))
      if (ids.length > 0) {
        const events = data.filter(event => ids.includes(event.id))
        eventStore.createMany(events)
      }
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function fetchEvent(id: number) {
    IncLoading()
    try {
      const res: any = await api.get(`event/${id}`)
      if (!eventStore.isAlReadyInStore(res.id) && isEventType(res)) {
        eventStore.createOne(res)
      }
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function fetchEventsByUser(userId: number) {
    IncLoading()
    try {
      if (userId) {
        const res = await api.get(`event/user/${userId}`)
        const data = res as EventType[]
        const ids = data.map((event: EventType) => event.id).filter(id => !eventStore.isAlReadyInStore(id))
        if (ids.length > 0) {
          const events = data.filter(event => ids.includes(event.id))
          const eventToStore = events.map(event => ({
            ...event,
            createdByUser: userId,
          }))
          eventStore.createMany(eventToStore)
        }
      }
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function fetchOne(id: number) {
    IncLoading()
    try {
      const res = await api.get(`event/${id}`)
      const event = res as EventType
      if (!eventStore.isAlReadyInStore(event.id)) {
        eventStore.createOne(event)
      }
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function postOne(event: EventType, userId?: number): Promise<EventType | undefined> {
    try {
      const res = await api.post(`event/${userId}`, { event })
      eventStore.createOne(res)
      toast.success('L\'événement a été créé avec succès')
      return res
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
    }
  }

  async function patchOne(event: EventType) {
    if (event && event.id) {
      IncLoading()
      try {
        const res = await api.patch(`event/${event.id}`, { event })
        if (isEventType(res)) {
          eventStore.updateOne(res.id, res)
          toast.success('L\'événement a été mis à jour avec succès')
        }
      } catch (error) {
        console.error(error)
        toast.error('Une erreur est survenue')
      }
      DecLoading()
    }
  }

  async function deleteOne(id: number) {
    IncLoading()
    try {
      await api.delete(`event/${id}`)
      eventStore.deleteOne(id)
      toast.success('L\'événement a été supprimé avec succès')
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  function isEventType(event: any): event is EventType {
    return hasOwnProperty(event, 'start') && hasOwnProperty(event, 'end')
  }

  function isEventTypeArray(events: any[]): events is EventType[] {
    return events.every(isEventType)
  }

  function isEventWithRelations(event: any): event is EventTypeWithRelations {
    if (isEventType(event) && event.employees) {
      return isEventType(event) && event.employees && !isArrayOfNumbers(event.employees)
    } else
      return false
  }

  return {
    deleteOne,
    fetchAllEvents,
    fetchEvent,
    fetchEventsByUser,
    fetchOne,
    getEventStatusColor,
    getEventStatusTranslation,
    getSignatureCount,
    isEventType,
    isEventTypeArray,
    isEventWithRelations,
    patchOne,
    postOne,
    sortEventByDate,
  }
}

export default eventHook
