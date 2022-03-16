import { BaseEntity } from "@/types/globals";
import { RoleEnum } from "@/types/Roles";
import { EmployeeType, EventType, FileType, SubscriptionEnum } from "../../types/typesExported";

export type UserState = {
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
}

export type UserFormType = Omit<UserType, "id" | "createdAt" | "updatedAt" | "events" | "employee" | "files">

export enum UserSearchableFields {
  EMAIL = 'email',
  FISTNAME = 'firstName',
  LASTNAME = 'lastName',
  COMPANYNAME = 'companyName',
  SIRET = 'siret'
}
