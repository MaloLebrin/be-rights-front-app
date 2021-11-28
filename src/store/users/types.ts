import { BaseEntity } from "@/types/globals";
import { RoleEnum } from "@/types/Roles";
import { EmployeeType, EventType } from "../typesExported";

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
	subscription: any //TODO type user's roles
	events?: number[] | EventType[]
	employee?: number[] | EmployeeType[]
}

export enum UserSearchableFields {
	EMAIL = 'email',
	FISTNAME = 'firstName',
	LASTNAME = 'lastName',
	COMPANYNAME = 'companyName',
	SIRET = 'siret'
}

export enum SubscriptionEnum {
	PREMIUM = 'PREMIUM',
	MEDIUM = 'MEDIUM',
	BASIC = 'BASIC'
}
