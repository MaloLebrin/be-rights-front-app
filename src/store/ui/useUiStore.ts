import { EntitiesEnum } from "@/types"
import { defineStore } from "pinia"
import { uiState } from "./state"
import { ModalModeEnum, ModalOptionsUi, ToastOptionsUi, ToastVariantsEnum } from "./types"

export const useUiStore = defineStore(EntitiesEnum.UI, {
	state: () => ({ ...uiState }),
	getters: {
		getUIState(state) {
			return state
		},
		getUiIsLoading(state) {
			return state.modal.isLoading
		},
		getUiModalState(state) {
			return state.modal
		},
		getUiToastState(state) {
			return state.toast
		}
	},
	actions: {
		resetUIState() {
			this.$reset()
		},
		setUiModal(options: ModalOptionsUi) {
			this.modal.modalName = options.modalName
			this.modal.isActive = options.isActive
			this.modal.data = options.data
			this.modal.modalMode = options.modalMode
		},
		resetUiModalState() {
			this.modal.modalName = null
			this.modal.isActive = false
			this.modal.data = null
			this.modal.modalMode = ModalModeEnum.READ
			this.modal.isLoading = false

		},
		resetUiToastState() {
			this.toast.isActive = false
			this.toast.message = ''
			this.toast.variant = ToastVariantsEnum.PRIMARY
			this.toast.duration = undefined
		},
		setIsLoadingStart() {
			this.modal.isLoading = true
		},
		setIsLoadingEnd() {
			this.modal.isLoading = false
		},
		setUIToast(options: ToastOptionsUi) {
			this.toast.isActive = options.isActive
			this.toast.message = options.message
			this.toast.variant = options.variant
			this.toast.duration = options.duration ? options.duration : 3000
		},
	},
})