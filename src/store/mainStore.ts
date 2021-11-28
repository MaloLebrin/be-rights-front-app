import { ThemeEnum } from "@/types"
import { defineStore } from "pinia"
import { useEventStore, useUserStore, useEmployeeStore, useFileStore } from './index'

export const useMainStore = defineStore('main', {
	state: () => ({
		isLoggedIn: false,
		isLoading: false,
		theme: ThemeEnum.LIGHT,
	}),
	getters: {
		getIsLoggedIn: (state) => state.isLoggedIn,
		getIsLoading: (state) => state.isLoading,
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
		toggleIsLoading() {
			this.isLoading = !this.isLoading
		},
		resetAllState() {
			const userStore = useUserStore()
			const eventStore = useEventStore()
			const fileStore = useFileStore()
			const employeStore = useEmployeeStore()

			this.$reset()
			userStore.$reset()
			eventStore.$reset()
			fileStore.$reset()
			employeStore.$reset()
		},
	},
})
