import type { schema } from 'normalizr'

export interface State<T> {
  entities: {
    byId: Record<number, T>
    allIds: number[]
    current: T | null
    active: number[]
  }
}
export type FilterFn<T> = (item: T) => boolean | null

export type OptionalFilterFn<T> = FilterFn<T> | null

export interface ByIdParams<T> {
  id: number
  payload: T
}

export interface BaseEntity<T> {
  path: string
  mutationPrefix: string
  actionPrefix: string
  singleSchema: schema.Entity<T>
  multipleSchema: schema.Array<T>
}

export interface WithId {
  id: number
}
