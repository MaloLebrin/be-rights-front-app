import { BaseEntity, OneToMany } from "@/types/globals";
import { RoleEnum } from "@/types/Roles";
import { EmployeeType } from "../employees/types";
import { EventType } from "../events/types";

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
	events?: OneToMany<EventType>
	employee?: OneToMany<EmployeeType>
}

export enum UserSearchableFields {
	EMAIL = 'email',
	FISTNAME = 'firstName',
	LASTNAME = 'lastName',
	COMPANYNAME = 'companyName',
	SIRET = 'siret'
}