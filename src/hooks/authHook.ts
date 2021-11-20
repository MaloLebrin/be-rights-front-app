import axiosInstance from "@/axios.config"
import API from "@/helpers/api"
import useMainStore from '@/store/mainStore'
import useEventStore from '@/store/events/eventStore'
import useUserStore from '@/store/users/userStore'
import { useCookie } from 'vue-cookie-next'
import mainHook from './mainHook'
import router from '@/router'
import { UserType } from "@/store/users/types"

export default function authHook() {
	const userStore = useUserStore()
	const mainStore = useMainStore()
	const eventStore = useEventStore()
	const { setCookie, getCookie, removeCookie } = useCookie()
	const { setThemeClass, setLightTheme } = mainHook()
	const api = new API(userStore.getCurrentUserToken!)

	function setBearerToken(token: string) {
		axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
	}

	function logout() {
		api.deleteCredentials()
		setLightTheme()
		mainStore.setIsLoggedOut()
		userStore.removeCurrent()
		mainStore.resetAllState()
		router.push('/')
	}

	async function loginWithToken(token: string) {
		try {
			mainStore.toggleIsLoading()
			const user = await api.post('user/token', { token: token })
			console.log(user, 'user')
			await setThemeClass()
			userStore.setCurrent(user as UserType)
			userStore.createOne(user as UserType)
			mainStore.setIsLoggedIn()
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
		routesIntermsOfUserRoles,
	}
}