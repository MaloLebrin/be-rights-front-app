import type { State } from '@malolebrin/pinia-entity-store'
import type { AddressType, AnswerType, FileType } from '@/types'
import type { BaseEntity } from '@/types/globals'
import type { UserType } from '@/store/user/types'

export interface EmployeeType extends BaseEntity {
  email: string
  phone: string
  firstName: string
  lastName: string
  hasSigned: boolean
  signedAt: Date
  createdByUser: null | number | UserType
  event?: number
  files?: FileType[] | number[]
  answers?: AnswerType[] | number[]
  address?: AddressType | number
}

export type EmployeeFormType = Omit<EmployeeType, 'id' | 'createdAt' | 'updatedAt' | 'files' | 'answers'>

export interface EmployeeState extends State<EmployeeType> { }
