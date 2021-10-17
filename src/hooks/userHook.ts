import { useMainStore } from '@/store/mainStore'
import axiosInstance from "@/axios.config"
import { UserType } from "@/store/users/types"
import { useUserStore } from "@/store/users/userStore"
import { parseEntity } from '~/store/utils/store'
import { useCookie } from 'vue-cookie-next'
import router from '~/router'

export default function userHook() {
	const userStore = useUserStore()
	const mainStore = useMainStore()
	const { setCookie, getCookie } = useCookie()

	async function login({ email, password }: { email: string, password: string }) {
		try {
			mainStore.toggleIsLoading()
			const res = await axiosInstance.post('login', { email, password })
			const user: UserType = parseEntity(res.data)// TODO remove when SQL API has been deploy
			userStore.setCurrent(user)
			userStore.createOne(user)
			setCookie('userToken', user.token)
			mainStore.setIsLoggedIn()
		} catch (error) {
			console.error(error)
		}
		mainStore.toggleIsLoading()
	}

	function logout() {
		// removeCookie('userToken')
		mainStore.setIsLoggedOut()
		userStore.removeCurrent()
		mainStore.resetAllState()
	}

	function routesIntermsOfUserRoles() {
		const token = getCookie('userToken')
		if (token && token.length > 0) {
			mainStore.setIsLoggedIn()
			if (userStore.isCurrentUserAdmin) {
				router.push('adminDashbord')
			}
			router.push('userDashboard')
		}
		router.push('login')
	}

	return {
		login,
		logout,
		routesIntermsOfUserRoles,
	}
}