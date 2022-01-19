import { defineStore } from "pinia"
import { EntitiesEnum } from "@/types/globals"
import { eventState } from "./state"
import { EventState, EventType } from "./types"
import createGetters from "../utils/createGetters"

export const useEventStore = defineStore(EntitiesEnum.EVENTS, {
  state: (): EventState => ({
    ...eventState
  }),
  getters: {
    ...createGetters<EventType>(eventState),

    // bellow getters in this specific store
    getEventsByUserId: (state) => (userId: number) => Object.values(state.entities.byId).filter(event => event.createdByUser === userId),
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
      const entity = this.entities.byId[id]
      this.entities.byId[id] = {
        ...entity,
        ...payload,
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

    // bellow getters in this specific store
  },
})

