export enum EntitiesEnum {
	USERS = 'users',
}

export type BaseEntity = {
	id?: number
	createdAt?: Date
	updatedAt?: Date
}