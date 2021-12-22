import axiosInstance from "@/axios.config"
import API from "@/helpers/api"
import { useCookie } from 'vue-cookie-next'
import router from '@/router'
import { useMainStore, useUserStore } from "@/store"
import { mainHook, userHook } from "."
import { UserType } from "@/store/typesExported"

export function authHook() {
	const userStore = useUserStore()
	const mainStore = useMainStore()
	const { getCookie } = useCookie()
	const { setThemeClass } = mainHook()
	const { storeUsersEntities } = userHook()
	const api = new API(userStore.getCurrentUserToken!)

	function setBearerToken(token: string) {
		axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
	}

	function logout() {
		api.deleteCredentials()
		mainStore.setIsLoggedOut()
		userStore.removeCurrent()
		mainStore.resetAllState()
		router.push('/')
	}

	async function loginWithToken(token: string) {
		try {
			mainStore.toggleIsLoading()
			const user = await api.post('user/token', { token: token })
			setThemeClass(user.theme)
			storeUsersEntities(user)
			mainStore.setIsLoggedIn()
			return user as UserType
		} catch (error) {
			console.error(error)
		}
		mainStore.toggleIsLoading()
	}

	async function routesIntermsOfUserRoles() {
		mainStore.toggleIsLoading()
		const token = getCookie('userToken')
		if (token && token.length > 0) {
			await loginWithToken(token)
			mainStore.setIsLoggedIn()
			if (userStore.isCurrentUserAdmin) {
				router.push('/adminDashboard')
			} else {
				router.push('/userDashboard')
			}
		} else {
			router.push('/')
		}
		mainStore.toggleIsLoading()
	}


	return {
		setBearerToken,
		logout,
		loginWithToken,
		routesIntermsOfUserRoles,
	}
}