import type { EventCreatePayload, EventType, EventTypeWithRelations } from '@/store/event/types'
import { EventStatusEnum, getEventStatusTranslationEnum } from '@/store/event/types'
import type { PaginatedResponse } from '@/helpers/api'
import APi from '@/helpers/api'
import type { EmployeeType } from '@/store/employee/types'
import { hasOwnProperty, isArrayOfNumbers, noNull } from '@/utils'

export function eventHook() {
  const eventStore = useEventStore()
  const { isUserType } = userHook()
  const { isAddressType } = addressHook()
  const { DecLoading, IncLoading } = useUiStore()
  const addressStore = useAddressStore()
  const { createOne: createOneAddress } = addressStore
  const toast = useToast()
  const api = new APi()

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

  function storeEventRelationEntities(events: EventType[]) {
    if (events?.length > 0) {
      const eventsToStore = events.map(event => {
        const address = event.address
        if (address && isAddressType(address)) {
          if (!addressStore.isAlreadyInStore(address?.id)) {
            createOneAddress(address)
            event.address = address.id
          }
        }

        return {
          ...event,
        }
      })
      eventStore.createMany(eventsToStore)
      return eventsToStore
    }
    return []
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
      const missingIds = data.map((event: EventType) => event.id).filter(id => !eventStore.isAlreadyInStore(id))
      if (missingIds.length > 0) {
        const events = data.filter(event => missingIds.includes(event.id))
        storeEventRelationEntities(events)
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
      if (!eventStore.isAlreadyInStore(res.id) && isEventType(res)) {
        storeEventRelationEntities([res])
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
        const missingIds = data.map((event: EventType) => event.id).filter(id => !eventStore.isAlreadyInStore(id))
        if (missingIds.length > 0) {
          const events = data.filter(event => missingIds.includes(event.id))
          const eventToStore = events.map(event => ({
            ...event,
            createdByUser: userId,
          }))
          storeEventRelationEntities(eventToStore)
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
      if (!eventStore.isAlreadyInStore(event.id)) {
        storeEventRelationEntities([event])
      }
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function postOne(payload: EventCreatePayload): Promise<EventType | undefined> {
    try {
      const { userId } = payload
      const res = await api.post(`event/${userId}`, payload)
      const eventToStore = res as EventType
      if (isUserType(eventToStore.createdByUser)) {
        eventToStore.createdByUser = res.createdByUser.id
      }
      eventStore.createOne(eventToStore)
      toast.success('L\'événement a été créé avec succès')
      return eventToStore
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
    if (isEventType(event) && event.employees?.length) {
      return !isArrayOfNumbers(event.employees)
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
    storeEventRelationEntities,
  }
}

export default eventHook
