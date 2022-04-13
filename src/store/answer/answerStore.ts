import createGetters from '../utils/createGetters'
import { answerState } from './state'
import type { AnswerState, AnswerType } from './types'
import { EntitiesEnum } from '@/types'

export const useAnswerStore = defineStore(EntitiesEnum.ANSWERS, {
  state: (): AnswerState => ({
    ...answerState,
  }),
  getters: {
    // getters common to all entities
    ...createGetters<AnswerType>(answerState),
    // findOnebyId: (state) => (id: number) => state.entities.byId[id],
    // findManyById: (state) => (ids: number[]) => ids.map(id => state.entities.byId[id]),
    // getAll: (state) => state.entities.byId,
    // getAllArray: (state) => Object.values(state.entities.byId),
    // getAllIds: (state) => state.entities.allIds,
    // getIsEmpty: (state) => state.entities.allIds.length === 0,
    // getIsNotEmpty: (state) => state.entities.allIds.length > 0,
    // getOne: (state) => (id: number) => state.entities.byId[id],
    // getMany: (state) => (ids: number[]) => ids.map(id => state.entities.byId[id]),
    // getWhere: (state) => (filter: (arg: AnswerType) => boolean | null) => {
    //   if (typeof filter !== 'function') {
    //     return state.entities.byId
    //   }
    //   return state.entities.allIds.reduce((acc: Record<number, AnswerType>, id: number) => {
    //     const item = state.entities.byId[id]
    //     if (!filter(item)) {
    //       return acc
    //     }
    //     acc[id] = item
    //     return acc
    //   }, {} as Record<number, AnswerType>)
    // },
    // getWhereArray: (state) => (filter: (arg: AnswerType) => boolean | null) => {
    //   if (typeof filter !== 'function') {
    //     return Object.values(state.entities.byId)
    //   }
    //   return Object.values(state.entities.allIds.reduce((acc: Record<number, AnswerType>, id: number) => {
    //     const item = state.entities.byId[id]
    //     if (!filter(item)) {
    //       return acc
    //     }
    //     acc[id] = item
    //     return acc
    //   }, {} as Record<number, AnswerType>))
    // },

    // bellow getters in this specific store
    getManyByEventId(state) {
      return (eventId: number) => Object.values(state.entities.byId).filter(answer => answer.event === eventId)
    },
    getManyByEmployeeId(state) {
      return (employeeId: number) => Object.values(state.entities.byId).filter(answer => answer.employee === employeeId)
    },
  },
  actions: {
    // actions common to all entities
    createOne(payload: AnswerType) {
      this.entities.byId[payload.id] = payload
      this.entities.allIds.push(payload.id)
    },
    createMany(payload: AnswerType[]) {
      payload.forEach(entity => this.createOne(entity))
    },
    setCurrent(payload: AnswerType) {
      this.entities.current = payload
    },
    removeCurrent() {
      this.entities.current = null
    },
    updateOne(id: number, payload: AnswerType): void {
      const entity = this.entities.byId[id]
      this.entities.byId[id] = {
        ...entity,
        ...payload,
      }
    },
    updateMany(payload: AnswerType[]): void {
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
      this.entities.byId = {}
      this.entities.allIds = []
      this.entities.active = []
      this.entities.current = null
    },
    setActive(id: number) {
      if (!this.entities.active.includes(id)) {
        this.entities.active.push(id)
      }
    },
    resetActive() {
      this.entities.active = []
    },

    // bellow getters in this specific store
  },
})

export default useAnswerStore
