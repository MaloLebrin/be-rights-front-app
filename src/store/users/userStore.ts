import { EntitiesEnum } from '../../types/globals'
import { defineStore } from "pinia"
import { UserType } from './types'
import { userState } from './state'
import createGetters from '../utils/createGetters'
import createActions from '../utils/createActions'

export const useUserStore = defineStore(EntitiesEnum.USERS, {
	state: () => ({
		...userState
	}),
	getters: {
		...createGetters<UserType>(userState),
	},
	actions: {
		...createActions<UserType>(userState),
	},
})
