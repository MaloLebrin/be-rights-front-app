import createState from '~/store/utils/createState'
import createEntity from '~/store/utils/createEntity'
import { UserType } from './types'
const entity = createEntity<UserType>('user')

export const userState = createState<UserType>(entity)