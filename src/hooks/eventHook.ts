// import { storeToRefs } from "pinia"
import useEventStore from "@/store/events/eventStore"
import { EventStatusEnum, EventType, getEventStatusTranslationEnum } from "@/store/events/types"
import useMainStore from "@/store/mainStore"
import APi, { PaginatedResponse } from "@/helpers/api"
import useUserStore from "@/store/users/userStore"
import { EmployeeType } from "@/store/employees/types"

export default function eventHook() {
	const eventStore = useEventStore()
	const mainStore = useMainStore()
	const userStore = useUserStore()
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
				eventStore.createMany(events)
			}

		} catch (error) {
			console.error(error)
		}
	}

	async function fetchEvent(id: number) {
		mainStore.toggleIsLoading()

		try {
			const res: any = await api.get(`event/${id}`)
			// const { data }: PaginatedResponse<EventType> = res
			if (!getAllIds.includes(res.id)) {
				eventStore.createOne(res)
			}
			console.log(res, 'res.data')

		} catch (error) {
			console.error(error)
		}
		mainStore.toggleIsLoading()
	}

	return {
		getEventStatusTranslation,
		getEventStatusColor,
		fetchAllEvents,
		fetchEvent,
		getSignatureCount,
	}
}