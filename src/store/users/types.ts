import { BaseEntity } from "@/types/globals";
import { RoleEnum } from "@/types/Roles";
import { EmployeeType, EventType, FileType, SubscriptionEnum } from "../typesExported";

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

export enum UserSearchableFields {
	EMAIL = 'email',
	FISTNAME = 'firstName',
	LASTNAME = 'lastName',
	COMPANYNAME = 'companyName',
	SIRET = 'siret'
}
