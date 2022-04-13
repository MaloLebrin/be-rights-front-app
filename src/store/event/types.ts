import type { FileType, UserType } from '../../types/typesExported'
import type { BaseEntity } from '@/types/globals'
import type { State } from '@/store/utils/types'

export interface EventType extends BaseEntity {
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
  createdByUser?: number | UserType
  files?: number[] | FileType[]
  employees?: number[]
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

export enum getEventStatusTranslationEnum {
  CREATE = 'créé',
  PENDING = 'en cours',
  COMPLETED = 'complété',
  CLOSED = 'terminé',
}

export interface EventState extends State<EventType> { }
