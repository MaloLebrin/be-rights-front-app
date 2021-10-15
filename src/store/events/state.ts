import createState from '../utils/createState'
import createEntity from '../utils/createEntity'
import { EventType } from './types'
const entity = createEntity<EventType>('event')

export const eventState = createState<EventType>(entity)