import API from "@/helpers/api"
import { useUiStore, useUserStore } from "@/store"
import { useAnswerStore } from "@/store/answers/answerStore"
import { AnswerType } from "@/store/typesExported"

export function answerHook() {
	const userStore = useUserStore()
	const answerStore = useAnswerStore()
	const { setUIErrorToast, setUIErrorToastWithMessage } = useUiStore()
	const api = new API(userStore.entities.current?.token!)

	async function postMany(eventId: number, employeeIds: number[]) {
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
	}

	return {
		postMany,
	}
}