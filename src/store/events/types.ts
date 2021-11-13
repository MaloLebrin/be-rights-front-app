import { BaseEntity } from "~/types/globals"
import { State } from "~/store/utils/types"

export interface EventType extends BaseEntity {
	name: string
	startDate: Date
	start: Date
	end: Date
	endDate: Date
	status: EventStatusEnum
	address: string | null
	postalCode: string | null
	city: string | null
	country: string | null
	signatureCount: number
	totalSignatureNeeded: number
	user?: any //TODO create user relation types
	employees?: any//TODO create user relation types
	imageRightCondition?: any//TODO create user relation types
}

export enum EventSearchableFields {
	NAME = 'name',
	ADDRESS = 'address',
	CITY = 'city',
}

export enum EventStatusEnum {
	CREATE = 'CREATE',
	PENDING = 'PENDING',
	COMPLETED = 'COMPLETED',
	CLOSED = 'CLOSED'
}

export enum getEventStatusTranslationEnum {
	CREATE = 'créé',
	PENDING = 'en cours',
	COMPLETED = 'complété',
	CLOSED = 'terminé'
}

export interface EventState extends State<EventType> { }