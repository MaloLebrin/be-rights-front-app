import { defineStore } from 'pinia'
import { createGetters } from '@malolebrin/pinia-entity-store'
import { defaultEmployeeState, employeState } from './state'
import type { EmployeeType } from './types'
import { EntitiesEnum } from '@/types/globals'

export const useEmployeeStore = defineStore(EntitiesEnum.EMPLOYEES, {
  state: () => ({
    ...employeState,
  }),
  getters: {
    ...createGetters<EmployeeType>(employeState),

    // bellow getters in this specific store,
    getAllByEventId: state => (eventId: number) => {
      return Object.values(state.entities.byId).filter(employee => employee.event === eventId)
    },
    getEmployeesByUserId: state => {
      return (userId: number) => Object.values(state.entities.byId).filter(employee => employee.createdByUser === userId)
    },

  },
  actions: {
    // actions common to all entities
    createOne(payload: EmployeeType) {
      this.entities.byId[payload.id] = payload
      this.entities.allIds.push(payload.id)
    },
    createMany(payload: EmployeeType[]) {
      payload.forEach(entity => this.createOne(entity))
    },
    setCurrent(payload: EmployeeType) {
      this.entities.current = payload
    },
    removeCurrent() {
      this.entities.current = null
    },
    updateOne(id: number, payload: EmployeeType): void {
      if (this.isAlreadyInStore(id)) {
        const entity = this.entities.byId[id]
        this.entities.byId[id] = {
          ...entity,
          ...payload,
        }
      } else {
        this.createOne(payload)
      }
    },
    updateMany(payload: EmployeeType[]): void {
      payload.forEach(entity => this.updateOne(entity.id, entity))
    },
    deleteOne(id: number) {
      delete this.entities.byId[id]
      this.entities.allIds = this.entities.allIds.filter(entityId => entityId !== id)
    },
    deleteMany(ids: number[]) {
      ids.forEach(id => this.deleteOne(id))
    },
    resetState() {
      this.$state = defaultEmployeeState()
    },
    setActive(id: number) {
      if (!this.isAlreadyActive(id)) {
        this.entities.active.push(id)
      }
    },
    resetActive() {
      this.entities.active = []
    },
  },
})

export default useEmployeeStore
