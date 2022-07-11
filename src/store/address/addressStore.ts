import { createActions, createGetters } from '@malolebrin/pinia-entity-store'
import { addressState, defaultAddressState } from './state'
import type { AddressType } from '@/types'
import { EntitiesEnum } from '@/types'

export const useAddressStore = defineStore(EntitiesEnum.ADDRESS, {
  state: () => ({
    ...addressState,
  }),
  getters: {
    ...createGetters<AddressType>(addressState),

  },
  actions: {
    ...createActions<AddressType>(addressState),
    resetState() {
      this.$state = defaultAddressState()
    },
  },
})
