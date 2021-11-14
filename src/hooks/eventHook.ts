// import { storeToRefs } from "pinia"
import useEventStore from "@/store/events/eventStore"
import { EventStatusEnum, getEventStatusTranslationEnum } from "@/store/events/types"

export default function eventHook() {
	const eventStore = useEventStore()
	// const { } = storeToRefs(eventStore)

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

	return {
		getEventStatusTranslation,
		getEventStatusColor,
	}
}