import { ThemeEnum } from "@/types"
import { defineStore } from "pinia"
import { useAnswerStore } from "./answers/answerStore"
import { useEventStore, useUserStore, useEmployeeStore, useFileStore } from './index'

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
// TODO make loader number incrementing or decrementing loader = false when = 0 this is for multiple async calls
// TODO loader must be onlyu use in this store check all files