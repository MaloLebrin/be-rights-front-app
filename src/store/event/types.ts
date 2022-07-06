import type { State } from '@malolebrin/pinia-entity-store'
import type { EmployeeType, FileType } from '@/types/typesExported'
import type { BaseEntity } from '@/types/globals'

export interface IEvent extends BaseEntity {
  name: string
  description: string
  start: Date
  end: Date
  status: EventStatusEnum
  address: string | null
  postalCode: string | null
  city: string | null
  country: string | null
  signatureCount: number
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
