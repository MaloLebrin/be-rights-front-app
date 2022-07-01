import createGetters from '../utils/createGetters'
import { answerState, defaultAnswerState } from './state'
import type { AnswerState, AnswerType } from './types'
import { EntitiesEnum } from '@/types'

export const useAnswerStore = defineStore(EntitiesEnum.ANSWERS, {
  state: (): AnswerState => ({
    ...answerState,
  }),
  getters: {
    // getters common to all entities
    ...createGetters<AnswerType>(answerState),

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
      this.$state = defaultAnswerState()
    },
    setActive(id: number) {
      if (!this.isAlReadyActive(id)) {
        this.entities.active.push(id)
      }
    },
    resetActive() {
      this.entities.active = []
    },

    // bellow Actions in this specific store
  },
})

export default useAnswerStore
