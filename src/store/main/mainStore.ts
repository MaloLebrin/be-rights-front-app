import { defineStore } from 'pinia'
import { useEmployeeStore, useEventStore, useFileStore, useUserStore } from '..'
import { ThemeEnum } from '@/types'
import { useAnswerStore } from '@/store/answer/answerStore'

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
      const userStore = useUserStore()
      const eventStore = useEventStore()
      const fileStore = useFileStore()
      const employeStore = useEmployeeStore()
      const answerStore = useAnswerStore()

      this.$reset()
      answerStore.$reset()
      userStore.$reset()
      eventStore.$reset()
      fileStore.$reset()
      employeStore.$reset()
    },
    setCookiesAccepted() {
      this.areCookiesAccepted = true
    },
  },
})
