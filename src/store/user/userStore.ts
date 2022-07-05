import { defineStore } from 'pinia'
import { createActions, createGetters } from '@malolebrin/pinia-entity-store'
import type { UserType } from './types'
import { defaultUserState, userState } from './state'
import { EntitiesEnum } from '@/types/globals'
import { RoleEnum } from '@/types/Roles'

export const useUserStore = defineStore(EntitiesEnum.USERS, {
  state: () => ({
    ...userState,
  }),
  actions: {
    ...createActions<UserType>(userState),

    resetState() {
      this.$state = defaultUserState()
    },
  },

  getters: {
    ...createGetters<UserType>(userState),

    getUserFullName: state => {
      const user = state.entities.current
      return `${user?.firstName} ${user?.lastName}`
    },
    isCurrentUserAdmin: state => state.entities.current?.roles === RoleEnum.ADMIN,
    isLoggedIn: state => state.entities.current !== undefined && state.entities.current !== null,
    getCurrentUserId: state => state.entities.current?.id,
    getCurrentUser: state => state.entities.current,
  },

})

export default useUserStore
