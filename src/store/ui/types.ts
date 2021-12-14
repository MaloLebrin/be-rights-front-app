export enum AdminModalNameEnum {
	ADD_EMPLOYEE = 'ADD_EMPLOYEE',
	USER_ADMIN = 'USER_ADMIN',
}

export enum ModalModeEnum {
	CREATE = 'CREATE',
	EDIT = 'EDIT',
	UPDATE = 'UPDATE',
	DELETE = 'DELETE',
	READ = 'READ',
}

export interface UiState {
	modalName: AdminModalNameEnum | null
	isActive: boolean
	data: Record<string, any> | null
	modalMode: ModalModeEnum
	isLoading: boolean
}

export interface ModalOptionsUi {
	modalName: AdminModalNameEnum
	isActive: boolean
	data: Record<string, any>
	modalMode: ModalModeEnum
}