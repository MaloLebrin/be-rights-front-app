import { BaseEntity } from "../../types/globals";
import { State } from "../utils/types";

export interface EventType extends BaseEntity {
	name: string
	startDate: Date
	endDate: Date
	status: string //TODO create enum status
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

export interface EventState extends State<EventType> { }