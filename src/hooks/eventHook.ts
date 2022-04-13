import type { EventType } from '@/store/event/types'
import { EventStatusEnum, getEventStatusTranslationEnum } from '@/store/event/types'
import type { PaginatedResponse } from '@/helpers/api'
import APi from '@/helpers/api'
import type { EmployeeType } from '@/store/employee/types'

export function eventHook() {
  const eventStore = useEventStore()
  const userStore = useUserStore()
  const { setUISucessToast, setUIErrorToast, DecLoading, IncLoading } = useUiStore()
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
    return employees.filter(employee => employee.hasSigned).length
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
      const ids = data.map((event: EventType) => event.id).filter(id => !eventStore.getAllIds.includes(id))
      if (ids.length > 0) {
        const events = data.filter(event => ids.includes(event.id))
        eventStore.createMany(events)
      }
    } catch (error) {
      console.error(error)
      setUIErrorToast()
    }
    DecLoading()
  }

  async function fetchEvent(id: number) {
    IncLoading()
    try {
      const res: any = await api.get(`event/${id}`)
      if (!eventStore.getAllIds.includes(res.id)) {
        eventStore.createOne(res)
      }
    } catch (error) {
      console.error(error)
      setUIErrorToast()
    }
    DecLoading()
  }

  async function fetchEventsByUser(userId: number) {
    IncLoading()
    try {
      if (userId) {
        const res = await api.get(`event/user/${userId}`)
        const data = res as EventType[]
        const ids = data.map((event: EventType) => event.id).filter(id => !eventStore.getAllIds.includes(id))
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
      setUIErrorToast()
    }
    DecLoading()
  }

  async function fetchOne(id: number) {
    IncLoading()
    try {
      const res = await api.get(`event/${id}`)
      const event = res as EventType
      if (!eventStore.getAllIds.includes(event.id)) {
        eventStore.createOne(event)
      }
    } catch (error) {
      console.error(error)
      setUIErrorToast()
    }
    DecLoading()
  }

  async function postOne(event: EventType, userId?: number): Promise<EventType | undefined> {
    try {
      const res = await api.post(`event/${userId}`, { event })
      eventStore.createOne(res)
      setUISucessToast('L\'événement a été créé avec succès')
      return res
    } catch (error) {
      console.error(error)
      setUIErrorToast()
    }
  }

  async function patchOne(event: EventType) {
    if (event && event.id) {
      IncLoading()
      try {
        const res = await api.patch(`event/${event.id}`, { event })
        const updatedEvent = res as EventType
        eventStore.updateOne(updatedEvent.id, updatedEvent)
        setUISucessToast('L\'événement a été mis à jour avec succès')
      } catch (error) {
        console.error(error)
        setUIErrorToast()
      }
      DecLoading()
    }
  }

  async function deleteOne(id: number) {
    IncLoading()
    try {
      await api.delete(`event/${id}`)
      eventStore.deleteOne(id)
      setUISucessToast('L\'événement a été supprimé avec succès')
    } catch (error) {
      console.error(error)
      setUIErrorToast()
    }
    DecLoading()
  }

  function isEventType(event: any): event is EventType {
    return event.start !== undefined
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
    patchOne,
    postOne,
    sortEventByDate,
  }
}

export default eventHook
