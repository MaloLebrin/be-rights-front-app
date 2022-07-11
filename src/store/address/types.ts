import type { BaseEntity } from '@/types'
import type { EmployeeType, EventType, UserType } from '@/types/typesExported'

export interface AddressType extends BaseEntity {
  addressLine: string
  addressLine2?: string
  postalCode: number
  city: string
  subdivision?: string // Code ISO des régions (pour la France)
  subdivision2?: string // Code ISO des départements (pour la France)
  country: string
  lat?: number
  lng?: number
  user?: UserType | number
  event?: EventType | number
  employee?: EmployeeType | number
}
