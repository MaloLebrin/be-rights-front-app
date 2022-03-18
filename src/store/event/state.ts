import createState from '@/store/utils/createState'
import createEntity from '@/store/utils/createEntity'
import { EventType } from './types'
const entity = createEntity<EventType>('event')

export const eventState = createState<EventType>(entity)