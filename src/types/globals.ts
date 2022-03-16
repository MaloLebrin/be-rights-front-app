export enum EntitiesEnum {
  BUGS_REPORTS = 'bugs_reports',
  USERS = 'users',
  EVENTS = 'events',
  EMPLOYEES = 'employees',
  FILES = 'files',
  ANSWERS = 'answers',
  UI = 'ui',
  TABLE = 'table',
  PAYMENTS = 'payments',
  SUBSCRIPTIONS = 'subscriptions',
}

export type BaseEntity = {
  id: number
  readonly createdAt: Date
  readonly updatedAt: Date
}

export enum ThemeEnum {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum LoaderTypeEnum {
  SPINNER = 'spinner',
  BOUNCE = 'bounce',
}

export type OneToOne<T> = T | number
export type OneToMany<T> = T[] | number[]

export function isTOrNumber<T>(value: T) {
  if (typeof value === 'number') {
    return value as number
  } else {
    return value as T
  }
}