import { EventStatusEnum, EventType, getEventStatusTranslationEnum } from "@/store/event/types"
import APi, { PaginatedResponse } from "@/helpers/api"
import { EmployeeType } from "@/store/employee/types"
import { useEventStore, useUiStore, useUserStore } from "@/store"

export function eventHook() {
  const eventStore = useEventStore()
  const userStore = useUserStore()
  const { setUISucessToast, setUIErrorToast, DecLoading, IncLoading } = useUiStore()
  const api = new APi(userStore.entities.current?.token!)

  function getEventStatusTranslation(status: EventStatusEnum) {
    return getEventStatusTranslationEnum[status]
  }

  function getEventStatusColor(status: EventStatusEnum) {
    switch (status) {
      case EventStatusEnum.PENDING:
        return "text-orange"
      case EventStatusEnum.CREATE:
        return "dark:text-white-break text-black"
      case EventStatusEnum.CLOSED:
        return "text-gray-500"
      case EventStatusEnum.COMPLETED:
        return "text-green"
      default:
        return "text-gray-500"
    }
  }

  function getSignatureCount(employees: EmployeeType[]) {
    return employees.filter(employee => employee.hasSigned).length
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
      setUISucessToast(`${ids.length} événements ont été récupérés avec succès`)
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
      setUISucessToast(`L'événement a été récupéré avec succès`)
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
        setUISucessToast(`Vos événements ont été récupéré avec succès`)
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
      setUISucessToast('L\'événement a été récupéré avec succès')
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
      setUISucessToast(`L'événement a été créé avec succès`)
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
      setUISucessToast(`L'événement a été supprimé avec succès`)
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
    fetchEventsByUser,
    fetchEvent,
    fetchOne,
    getEventStatusColor,
    getEventStatusTranslation,
    getSignatureCount,
    isEventType,
    patchOne,
    postOne,
  }
}

export default eventHook