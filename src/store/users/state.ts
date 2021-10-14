import createState from '../utils/createState'
import createEntity from '../utils/createEntity'
import { UserType } from './types'
const entity = createEntity<UserType>('user')

export const userState = createState<UserType>(entity)