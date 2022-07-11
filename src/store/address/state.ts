import { createState } from '@malolebrin/pinia-entity-store'
import type { AddressType } from './types'

export const addressState = createState<AddressType>()

export function defaultAddressState() {
  return createState<AddressType>()
}
