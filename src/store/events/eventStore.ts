import { defineStore } from "pinia"
import { EntitiesEnum } from "@/types/globals"
import createActions from "@/store/utils/createActions"
import createGetters from "@/store/utils/createGetters"
import { eventState } from "./state"
import { EventState, EventType } from "./types"

export const useEventStore = defineStore(EntitiesEnum.EVENTS, {
  state: (): EventState => ({
    ...eventState
  }),
  getters: {
    ...createGetters<EventType>(eventState),
    getEventsByUserId: (state) => {
      return (userId: number) => Object.values(state.entities.byId).filter(event => event.createdByUser === userId)
    },
    getOne(state) {
      return (id: number) => state.entities.byId[id]
    },
    getMany(state) {
      return (ids: number[]) => ids.map(id => state.entities.byId[id])
    },
  },
  actions: {
    ...createActions<EventType>(eventState),
  },
})

