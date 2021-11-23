export enum EntitiesEnum {
	USERS = 'users',
	EVENTS = 'events',
	EMPLOYEES = 'employees',
	FILES = 'files',
}

export type BaseEntity = {
	id: number
	createdAt?: Date
	updatedAt?: Date
}

export enum ThemeEnum {
	LIGHT = 'light',
	DARK = 'dark'
}