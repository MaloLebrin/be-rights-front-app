import { defineStore } from 'pinia'
import { createActions, createGetters } from '@malolebrin/pinia-entity-store'
import type { PhotographerCreatePayload, UserType } from './types'
import { basePhotographerForm, defaultUserState, userState } from './state'
import { EntitiesEnum } from '@/types/globals'
import { RoleEnum } from '@/types/Roles'

export const useUserStore = defineStore(EntitiesEnum.USERS, {
  state: () => ({
    ...userState,
  }),
  actions: {
    ...createActions<UserType>(userState),

    setPhotographerForm(payload: PhotographerCreatePayload) {
      this.photographerForm = payload
    },
    resetPhotographerForm() {
      this.photographerForm = basePhotographerForm
    },

    resetState() {
      this.$state = defaultUserState()
    },

    async getUserWithTokenFromAPI(token: string) {
      const { loginWithToken } = authHook()
      await loginWithToken(token)
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
    getFirst: state => Object.values(state.entities.byId)?.length > 0 ? Object.values(state.entities.byId)[0] : null,
    getRoutePrefixBasedOnRole: state => {
      if (state.entities.current?.roles === RoleEnum.ADMIN) {
        return 'admin'
      }
      return 'user'
    },
  },

})

export default useUserStore
