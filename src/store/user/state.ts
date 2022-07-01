import { createState } from '@malolebrin/pinia-entity-store'
import type { UserType } from './types'

export const userState = createState<UserType>()

export function defaultUserState() {
  return createState<UserType>()
}
