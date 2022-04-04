import { ModalModeEnum, ToastVariantsEnum, UiState } from "./types"

export const uiState: UiState = {
  modal: {
    modalName: null,
    isActive: false,
    data: null,
    modalMode: ModalModeEnum.READ,
    isLoading: false
  },
  toast: {
    isActive: false,
    message: '',
    variant: ToastVariantsEnum.PRIMARY,
    duration: 500,
  },
  isLoading: 0,

}
