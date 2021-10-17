import { defineStore } from "pinia"
import { ThemeEnum } from "~/types/globals"
import { useEventStore } from './events/eventStore'
import { useUserStore } from "./users/userStore"

export const useMainStore = defineStore('main', {
	state: () => ({
		isLoggedIn: false,
		isLoading: false,
		theme: ThemeEnum.DEFAULT,
	}),
	getters: {
		getIsLoggedIn: (state) => state.isLoggedIn,
		getIsLoading: (state) => state.isLoading,
		getTheme: (state) => state.theme,
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
		toggleThemeApp() {
			if (this.theme === ThemeEnum.DARK) {
				this.theme = ThemeEnum.DEFAULT
			} else if (this.theme === ThemeEnum.DEFAULT) {
				this.theme = ThemeEnum.DARK
			}
		},
		resetAllState() {
			const userStore = useUserStore()
			const eventStore = useEventStore()

			this.$reset()
			userStore.$reset()
			eventStore.$reset()
		},
	},
})
