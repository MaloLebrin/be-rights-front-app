import { ThemeEnum } from "@/types"
import { defineStore } from "pinia"
import { useAnswerStore } from "@/store/answer/answerStore"

export const useMainStore = defineStore('main', {
  state: () => ({
    isLoggedIn: false,
    theme: ThemeEnum.LIGHT,
  }),
  getters: {
    getIsLoggedIn: (state) => state.isLoggedIn,
    getTheme: (state) => state.theme,
    isDarkTheme: (state) => state.theme === ThemeEnum.DARK
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
  },
})
