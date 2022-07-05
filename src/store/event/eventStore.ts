import { defineStore } from 'pinia'
import { createGetters } from '@malolebrin/pinia-entity-store'
import { defaultEventState, eventState } from './state'
import type { EventType } from './types'
import { EntitiesEnum } from '@/types/globals'

export const useEventStore = defineStore(EntitiesEnum.EVENTS, {
  state: () => ({
    ...eventState,
  }),
  getters: {
    ...createGetters<EventType>(eventState),

    // bellow getters in this specific store
    getEventsByUserId: state => (userId: number) => Object.values(state.entities.byId).filter(event => event.createdByUser === userId),
  },
  actions: {
    // actions common to all entities
    createOne(payload: EventType) {
      this.entities.byId[payload.id] = payload
      this.entities.allIds.push(payload.id)
    },
    createMany(payload: EventType[]) {
      payload.forEach(entity => this.createOne(entity))
    },
    setCurrent(payload: EventType) {
      this.entities.current = payload
    },
    removeCurrent() {
      this.entities.current = null
    },
    updateOne(id: number, payload: EventType): void {
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
    updateMany(payload: EventType[]): void {
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
      this.$state = defaultEventState()
    },
    setActive(id: number) {
      if (!this.isAlreadyActive(id)) {
        this.entities.active.push(id)
      }
    },
    resetActive() {
      this.entities.active = []
    },

    // bellow actions in this specific store
  },
})

export default useEventStore
