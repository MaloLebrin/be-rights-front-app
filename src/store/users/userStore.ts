import { EntitiesEnum } from '../../types/globals'
import { defineStore } from "pinia"
import { UserState, UserType } from './types'
import { userState } from './state'

export const useUserStore = defineStore(EntitiesEnum.USERS, {
	state: () => ({
		...userState
	}),
	getters: {
		// getCurrentUserFullName: state => `${state.currentUser.firstName} ${state.currentUser.lastName}`,
		// findOneById: (state) => (userId: number) => state.users.find(user => user.id === userId),
	},
	actions: {
		// TODO alert errors state api in pinia
		// addUser(user: UserType) {
		// 	if (!this.users.find(u => u.id === user.id)) {
		// 		this.users.push(user)
		// 		return this.users
		// 	}
		// },
		// setCurrentUser(user: UserType) {
		// 	this.currentUser = user
		// },
		// removeCurrentUser() {
		// 	this.currentUser = {} as UserType
		// }
	},
})
