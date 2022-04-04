import { EntitiesEnum } from "@/types"
import { defineStore } from "pinia"
import { uiState } from "./state"
import { ModalModeEnum, ModalOptionsUi, ToastOptionsUi, ToastVariantsEnum } from "./types"

export const useUiStore = defineStore(EntitiesEnum.UI, {
  state: () => ({ ...uiState }),
  getters: {
    getUIState: (state) => state,
    getUiIsLoading: (state) => state.modal.isLoading,
    getUiModalState: (state) => state.modal,
    getUiToastState: (state) => state.toast,
    getUIIsLoading: (state) => state.isLoading > 0,
    getUiModalData: (state) => state.modal.data,
  },
  actions: {
    resetUIState() {
      this.$reset()
    },
    IncLoading() {
      this.isLoading++
    },
    DecLoading() {
      this.isLoading--
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
    setUIToast(options: ToastOptionsUi) {
      this.toast.isActive = options.isActive
      this.toast.message = options.message
      this.toast.variant = options.variant
      this.toast.duration = options.duration ? options.duration : this.toast.duration
    },
    setUIErrorToast() {
      this.toast.isActive = true
      this.toast.message = 'Une erreur est survenue'
      this.toast.variant = ToastVariantsEnum.DANGER
      this.toast.duration = 500
    },
    setUIErrorToastWithMessage(message: string) {
      this.toast.isActive = true
      this.toast.message = message
      this.toast.variant = ToastVariantsEnum.DANGER
      this.toast.duration = 500
    },
    setUISucessToast(message: string) {
      this.toast.isActive = true
      this.toast.message = message
      this.toast.variant = ToastVariantsEnum.SUCCESS
      this.toast.duration = 500
    }
  },
})
export default useUiStore