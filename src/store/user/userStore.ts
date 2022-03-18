import { EntitiesEnum } from '@/types/globals'
import { defineStore } from "pinia"
import { UserType } from './types'
import { userState } from './state'
import createGetters from '@/store/utils/createGetters'
import { RoleEnum } from '@/types/Roles'

export const useUserStore = defineStore(EntitiesEnum.USERS, {
  state: () => ({
    ...userState
  }),
  getters: {
    ...createGetters<UserType>(userState),

    getUserFullName: (state) => {
      const user = state.entities.current
      return `${user?.firstName} ${user?.lastName}`
    },
    isCurrentUserAdmin: (state) => {
      return state.entities.current?.roles === RoleEnum.ADMIN
    },
    getCurrentUserToken: (state) => {
      return state.entities.current?.token
    },
    getCurrentUserId: (state) => state.entities.current?.id,
  },

  actions: {
    // actions common to all entities
    createOne(payload: UserType) {
      this.entities.byId[payload.id] = payload
      this.entities.allIds.push(payload.id)
    },
    createMany(payload: UserType[]) {
      payload.forEach(entity => this.createOne(entity))
    },
    setCurrent(payload: UserType) {
      this.entities.current = payload
    },
    removeCurrent() {
      this.entities.current = null
    },
    updateOne(id: number, payload: UserType): void {
      const entity = this.entities.byId[id]
      this.entities.byId[id] = {
        ...entity,
        ...payload,
      }
    },
    updateMany(payload: UserType[]): void {
      payload.forEach(entity => this.updateOne(entity.id, entity))
    },
    deleteOne(id: number) {
      delete this.entities.byId[id]
      this.entities.allIds = this.entities.allIds.filter(entityId => entityId !== id)
    },
    deleteMany(ids: number[]) {
      ids.forEach(id => this.deleteOne(id))
    },
    setActive(id: number) {
      if (!this.entities.active.includes(id)) {
        this.entities.active.push(id)
      }
    },
    resetActive() {
      this.entities.active = []
    },

    resetState() {
      this.entities.byId = {}
      this.entities.allIds = []
      this.entities.active = []
    },
  },
})

export default useUserStore