import type { UserType } from './types'
import createState from '@/store/utils/createState'
import createEntity from '@/store/utils/createEntity'
const entity = createEntity<UserType>('user')

export const userState = createState<UserType>(entity)
