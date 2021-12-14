import { EntitiesEnum } from "@/types"
import { defineStore } from "pinia"
import { uiState } from "./state"
import { ModalOptionsUi } from "./types"

export const useUiStore = defineStore(EntitiesEnum.UI, {
	state: () => ({ ...uiState }),
	getters: {
		getUIState(state) {
			return state
		},
	},
	actions: {
		resetUIState() {
			this.$reset()
		},
		setUiModal(options: ModalOptionsUi) {
			this.modalName = options.modalName
			this.isActive = options.isActive
			this.data = options.data
			this.modalMode = options.modalMode
		},
		setIsLoadingStart() {
			this.isLoading = true
		},
		setIsLoadingEnd() {
			this.isLoading = false
		},
	},
})