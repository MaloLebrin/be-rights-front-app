export enum ModalNameEnum {
	ADD_EMPLOYEE = 'ADD_EMPLOYEE',
	USER_ADMIN = 'USER_ADMIN',
	EVENT_FORM = 'EVENT_FORM',
}

export enum ModalModeEnum {
	CREATE = 'CREATE',
	EDIT = 'EDIT',
	UPDATE = 'UPDATE',
	DELETE = 'DELETE',
	READ = 'READ',
}

export interface UiState {
	modalName: ModalNameEnum | null
	isActive: boolean
	data: Record<string, any> | null
	modalMode: ModalModeEnum
	isLoading: boolean
}

export interface ModalOptionsUi {
	modalName: ModalNameEnum
	isActive: boolean
	data: Record<string, any>
	modalMode: ModalModeEnum
}