import { EntitiesEnum } from '@/types/globals'
import { defineStore } from "pinia"
import { UserType } from './types'
import { userState } from './state'
import createGetters from '@/store/utils/createGetters'
import createActions from '@/store/utils/createActions'
import { RoleEnum } from '@/types/Roles'

const useUserStore = defineStore(EntitiesEnum.USERS, {
	state: () => ({
		...userState
	}),
	getters: {
		...createGetters<UserType>(userState),
		getUserFullName(state) {
			const user = state.entities.current
			return `${user?.firstName} ${user?.lastName}`
		},
		isCurrentUserAdmin(state) {
			return state.entities.current?.roles === RoleEnum.ADMIN
		},
		getCurrentUserToken(state) {
			return state.entities.current?.token
		}
	},
	actions: {
		...createActions<UserType>(userState),
	},
})

export default useUserStore