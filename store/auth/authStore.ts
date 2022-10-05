import { defineStore } from 'pinia'
import { state } from './state'
import type { JWTDecodedType } from '@/types'
import { RoleEnum } from '@/types'
import { noNull, noUndefined } from '@/utils'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    ...state,
  }),
  getters: {
    isAuthUserAdmin: state => state.user?.roles.includes(RoleEnum.ADMIN),
    getIsLoggedIn: state => noNull(state.user) && noUndefined(state.user),
    getLoggedUserFullName: state => {
      if (state.user) {
        const { getUserfullName } = userHook()
        return getUserfullName(state.user)
      }
    },
  },
  actions: {
    setJWTasUser(payload: JWTDecodedType) {
      state.user = payload
    },
  },
})
