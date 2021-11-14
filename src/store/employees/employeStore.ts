import { defineStore } from "pinia"
import createActions from "@/store/utils/createActions"
import createGetters from "@/store/utils/createGetters"
import { EntitiesEnum } from "@/types/globals"
import { employeState } from "./state"
import { EmployeeState, EmployeeType } from "./types"

const useEmployeeStore = defineStore(EntitiesEnum.EMPLOYEES, {
	state: (): EmployeeState => ({
		...employeState,
	}),
	actions: {
		...createActions<EmployeeType>(employeState),
	},
	getters: {
		...createGetters<EmployeeType>(employeState),
	}
})

export default useEmployeeStore