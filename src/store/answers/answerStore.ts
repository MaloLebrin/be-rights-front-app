import { EntitiesEnum } from "@/types"
import createActions from "../utils/createActions"
import createGetters from "../utils/createGetters"
import { answerState } from "./state"
import { AnswerState, AnswerType } from "./types"


export const useAnswerStore = defineStore(EntitiesEnum.ANSWERS, {
	state: (): AnswerState => ({
		...answerState
	}),
	getters: {
		...createGetters<AnswerType>(answerState),
		getOne(state) {
			return (id: number) => state.entities.byId[id]
		},
		getMany(state) {
			return (ids: number[]) => ids.map(id => state.entities.byId[id])
		},
		getManyByEventId(state) {
			return (eventId: number) => Object.values(state.entities.byId).filter(answer => answer.event === eventId)
		},
		getManyByEmployeeId(state) {
			return (employeeId: number) => Object.values(state.entities.byId).filter(answer => answer.employee === employeeId)
		},
	},
	actions: {
		...createActions<AnswerType>(answerState),
	}
})