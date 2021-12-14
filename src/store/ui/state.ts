import { ModalModeEnum, UiState } from "./types"

export const uiState: UiState = {
	modalName: null,
	isActive: false,
	data: null,
	modalMode: ModalModeEnum.READ,
	isLoading: false
}