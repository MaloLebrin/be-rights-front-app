import type { State } from '@malolebrin/pinia-entity-store'
import type { EmployeeType, FileType } from '@/types/typesExported'
import type { AddressType, AddressTypeCreate, BaseEntity } from '@/types'

export interface IEvent extends BaseEntity {
  name: string
  description: string
  start: Date
  end: Date
  status: EventStatusEnum
  signatureCount: number
  address?: AddressType | number
  totalSignatureNeeded: number
  createdByUser?: number
}

export interface EventType extends IEvent {
  files?: number[]
  employees?: number[]
  events?: number[]
}

export interface EventTypeWithRelations extends IEvent {
  files?: FileType[]
  employees?: EmployeeType[]
  events?: EventType[]
}

export type EventTypeCreate = Omit<IEvent, 'status' | 'id' | 'createdAt' | 'deletedAt' | 'updatedAt' | 'totalSignatureNeeded' | 'signatureCount'>
export interface EventCreatePayload {
  event: EventTypeCreate
  address: AddressTypeCreate
}

export type EventFormType = Omit<EventType, 'id' | 'createdAt' | 'updatedAt'>

export enum EventSearchableFields {
  NAME = 'name',
  ADDRESS = 'address',
  CITY = 'city',
}

export enum EventStatusEnum {
  CREATE = 'CREATE',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CLOSED = 'CLOSED',
}

export const eventStatusArray = Object.values(EventStatusEnum)

export enum getEventStatusTranslationEnum {
  CREATE = 'créé',
  PENDING = 'en cours',
  COMPLETED = 'complété',
  CLOSED = 'terminé',
}

export interface EventState extends State<EventType> { }
