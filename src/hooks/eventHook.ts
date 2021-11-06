import { storeToRefs } from "pinia"
import { useEventStore } from "~/store/events/eventStore"
import { EventStatusEnum, getEventStatusTranslationEnum } from "~/store/events/types"

export default function eventHook() {
	const eventStore = useEventStore()
	const { } = storeToRefs(eventStore)

	function getEventStatusTranslation(status: EventStatusEnum) {
		return getEventStatusTranslationEnum[status]
	}


	return {
		getEventStatusTranslation,
	}
}