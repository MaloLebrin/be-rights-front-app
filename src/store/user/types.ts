import type { EmployeeType, EventType, FileType, SubscriptionEnum } from '../../types/typesExported'
import type { BaseEntity } from '@/types/globals'
import type { RoleEnum } from '@/types/Roles'

export interface UserState {
  users: UserType[]
  currentUser: UserType
}

export interface UserType extends BaseEntity {
  email: string
  token: string
  firstName: string
  lastName: string
  companyName: string
  siret: string
  apiKey: string
  roles: RoleEnum
  subscription: SubscriptionEnum
  events?: number[] | EventType[]
  employee?: number[] | EmployeeType[]
  files?: number[] | FileType[]
  profilePicture?: string | null
}

export type UserFormType = Omit<UserType, 'id' | 'createdAt' | 'updatedAt' | 'events' | 'employee' | 'files'>

export enum UserSearchableFields {
  EMAIL = 'email',
  FISTNAME = 'firstName',
  LASTNAME = 'lastName',
  COMPANYNAME = 'companyName',
  SIRET = 'siret',
}
