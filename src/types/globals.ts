export enum EntitiesEnum {
	USERS = 'users',
	EVENTS = 'events',
}

export type BaseEntity = {
	id: number
	createdAt?: Date
	updatedAt?: Date
}