export enum ModalNameEnum {
  ADD_EMPLOYEE = 'ADD_EMPLOYEE',
  USER_ADMIN = 'USER_ADMIN',
  EVENT_FORM = 'EVENT_FORM',
  FILE_MODAL = 'FILE_MODAL',
}

export enum ModalModeEnum {
  CREATE = 'CREATE',
  EDIT = 'EDIT',
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
  },
  isLoading: number,
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

export const ToastVariantsArray = Object.values(ToastVariantsEnum).map(variant => variant)

export type ToastVariantsMap = {
  [key in ToastVariantsEnum]: string
}

export const ToastVariantsMap: ToastVariantsMap = {
  primary: 'bg-blue text-white font-normal hover:bg-blue-dark focus:ring-4 ring-blue',
  warning: 'bg-orange text-white hover:bg-orange-dark focus:ring-4 ring-orange',
  danger: 'bg-red text-white hover:text-white hover:bg-red-light focus:ring-4 ring-red',
  success: 'bg-green text-white hover:bg-green-dark focus:ring-4 ring-green',
}
