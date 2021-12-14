import { EntitiesEnum } from "@/types"
import { defineStore } from "pinia"
import { uiState } from "./state"

export const useUiStore = defineStore(EntitiesEnum.UI, {
	state: () => ({ ...uiState }),
	getters: {
		getUIState(state) {
			return state
		},
	},
	actions: {

	},
})