import { defineStore } from 'pinia'
import { defaultState } from './state'
import { ThemeEnum } from '@/types'

export const useMainStore = defineStore('main', {
  state: () => ({
    isLoggedIn: false,
    theme: ThemeEnum.LIGHT,
    areCookiesAccepted: false,
  }),
  getters: {
    getIsLoggedIn: state => state.isLoggedIn,
    getTheme: state => state.theme,
    isDarkTheme: state => state.theme === ThemeEnum.DARK,
    getAreCookiesAccepted: state => state.areCookiesAccepted,
  },
  actions: {
    setIsLoggedIn() {
      this.isLoggedIn = true
    },
    setIsLoggedOut() {
      this.isLoggedIn = false
    },
    resetAllState() {
      this.$reset()
    },
    setCookiesAccepted() {
      this.areCookiesAccepted = true
    },
  },
})
