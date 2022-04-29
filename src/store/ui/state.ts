import type { UiState } from './types'
import { ModalModeEnum, ToastVariantsEnum } from './types'

export const uiState: UiState = defaultUiState()

export function defaultUiState() {
  return {
    modal: {
      modalName: null,
      isActive: false,
      data: null,
      modalMode: ModalModeEnum.READ,
      isLoading: false,
    },
    toast: {
      isActive: false,
      message: '',
      variant: ToastVariantsEnum.PRIMARY,
      duration: 500,
    },
    isLoading: 0,
    isDrawerOpen: false,
  }
}
