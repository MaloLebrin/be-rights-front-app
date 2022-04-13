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

export interface BaseEntity {
  readonly id: number
  readonly createdAt: Date
  readonly updatedAt: Date
}

export enum ThemeEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum LoaderTypeEnum {
  SPINNER = 'spinner',
  BOUNCE = 'bounce',
}
