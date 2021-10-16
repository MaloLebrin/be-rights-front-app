import { BaseEntity } from "@/types/globals";
import { RoleEnum } from "~/types/Roles";

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
	suscription: any //TODO type user's roles
	events?: number[]
	employee?: number[]
}

export enum UserSearchableFields {
	EMAIL = 'email',
	FISTNAME = 'firstName',
	LASTNAME = 'lastName',
	COMPANYNAME = 'companyName',
	SIRET = 'siret'
}