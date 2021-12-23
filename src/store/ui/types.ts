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

export enum ToastVariantsEnum {
	'PRIMARY' = 'primary',
	'WARNING' = 'warning',
	'DANGER' = 'danger',
	'SUCCESS' = 'success',
}

export interface UiState {
	modal: {
		modalName: ModalNameEnum | null
		isActive: boolean
		data: Record<string, any> | null
		modalMode: ModalModeEnum
		isLoading: boolean
	},
	toast: {
		isActive: boolean
		message: string
		variant: ToastVariantsEnum
		duration?: number
	}
}

export interface ToastOptionsUi {
	isActive: boolean
	message: string
	variant: ToastVariantsEnum
	duration?: number
}

export interface ModalOptionsUi {
	modalName: ModalNameEnum
	isActive: boolean
	data: Record<string, any>
	modalMode: ModalModeEnum
}