import { defineStore } from 'pinia'
import type { UserType } from './types'
import { defaultUserState, userState } from './state'
import { EntitiesEnum } from '@/types/globals'
import createGetters from '@/store/utils/createGetters'
import { RoleEnum } from '@/types/Roles'

export const useUserStore = defineStore(EntitiesEnum.USERS, {
  state: () => ({
    ...userState,
  }),
  getters: {
    ...createGetters<UserType>(userState),

    getUserFullName: state => {
      const user = state.entities.current
      return `${user?.firstName} ${user?.lastName}`
    },
    isCurrentUserAdmin: state => {
      return state.entities.current?.roles === RoleEnum.ADMIN
    },
    getCurrentUserToken: state => {
      return state.entities.current?.token
    },
    getCurrentUserId: state => state.entities.current?.id,
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
      if (this.isAlReadyInStore(id)) {
        const entity = this.entities.byId[id]
        this.entities.byId[id] = {
          ...entity,
          ...payload,
        }
      } else {
        this.createOne(payload)
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
      if (!this.isAlReadyActive(id)) {
        this.entities.active.push(id)
      }
    },
    resetActive() {
      this.entities.active = []
    },

    resetState() {
      this.$state = defaultUserState()
    },
  },
})

export default useUserStore
