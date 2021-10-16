import { defineStore } from "pinia"
import { useEventStore } from './events/eventStore'
import { useUserStore } from "./users/userStore"

export const useMainStore = defineStore('main', {
	state: () => ({
		isLoggedIn: false,
		isLoading: false,
	}),
	getters: {
		getIsLoggedIn: (state) => state.isLoggedIn,
		getIsLoading: (state) => state.isLoading,
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

			this.$reset()
			userStore.$reset()
			eventStore.$reset()
		},
	},
})
