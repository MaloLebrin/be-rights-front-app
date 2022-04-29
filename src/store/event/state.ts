import type { EventType } from './types'
import createState from '@/store/utils/createState'
import createEntity from '@/store/utils/createEntity'
const entity = createEntity<EventType>('event')

export const eventState = createState<EventType>(entity)

export function defaultEventState() {
  return createState<EventType>(entity)
}
