export enum EntitiesEnum {
  ADDRESS = 'address',
  ANSWERS = 'answers',
  BUGS_REPORTS = 'bugs_reports',
  EMPLOYEES = 'employees',
  EVENTS = 'events',
  FILES = 'files',
  NEWSLETTER = 'newsletter',
  PAYMENTS = 'payments',
  SUBSCRIPTIONS = 'subscriptions',
  TABLE = 'table',
  UI = 'ui',
  USERS = 'users',
}

export interface BaseEntity {
  readonly id: number
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly deletedAt?: Date
}

export enum ThemeEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

export type VeeValidateValues = Record<string, any>

export interface ValidationRequest {
  success: boolean
  message: string
}
