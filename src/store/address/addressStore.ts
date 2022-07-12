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
    getOneByEventId: state => (eventId: number) => Object.values(state.entities.byId).filter(address => address.eventId === eventId)[0],
    getOneByEmployeeId: state => (employeeId: number) => Object.values(state.entities.byId).filter(address => address.employeeId === employeeId)[0],
  },
  actions: {
    ...createActions<AddressType>(addressState),
    resetState() {
      this.$state = defaultAddressState()
    },
  },
})
