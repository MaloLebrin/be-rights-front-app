import { EventStatusEnum, EventType, getEventStatusTranslationEnum } from "@/store/events/types"
import APi, { PaginatedResponse } from "@/helpers/api"
import { EmployeeType } from "@/store/employees/types"
import { useEventStore, useMainStore, useUiStore, useUserStore } from "@/store"

export function eventHook() {
	const eventStore = useEventStore()
	const mainStore = useMainStore()
	const userStore = useUserStore()
	const { setUISucessToast, setUIErrorToast } = useUiStore()
	const api = new APi(userStore.entities.current?.token!)
	const { getAllIds } = eventStore

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

	async function fetchAllEvents() {

		try {
			const res: any = await api.get(`event`)
			const { currentPage, data, limit, total }: PaginatedResponse<EventType> = res
			const ids = data.map((event: EventType) => event.id).filter(id => !getAllIds.includes(id))
			if (ids.length > 0) {
				const events = data.filter(event => ids.includes(event.id))
				const eventToStore = events.map(event => ({
					...event,
					createdByUser: event.createdByUser.id,
				}))
				eventStore.createMany(eventToStore)
			}
			setUISucessToast(`${ids.length} événements ont été récupérés avec succès`)
		} catch (error) {
			console.error(error)
			setUIErrorToast()
		}
	}

	async function fetchEvent(id: number) {
		mainStore.toggleIsLoading()

		try {
			const res: any = await api.get(`event/${id}`)
			if (!getAllIds.includes(res.id)) {
				eventStore.createOne(res)
			}
			console.log(res, 'res.data')
			setUISucessToast(`L'événement a été récupéré avec succès`)
		} catch (error) {
			console.error(error)
			setUIErrorToast()
		}
		mainStore.toggleIsLoading()
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

	function isEventType(event: any): event is EventType {
		return event.start !== undefined
	}

	return {
		fetchAllEvents,
		fetchEvent,
		getEventStatusColor,
		getEventStatusTranslation,
		getSignatureCount,
		isEventType,
		postOne,
	}
}