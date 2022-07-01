import { createState } from '@malolebrin/pinia-entity-store'
import type { EventType } from './types'

export const eventState = createState<EventType>()

export function defaultEventState() {
  return createState<EventType>()
}
