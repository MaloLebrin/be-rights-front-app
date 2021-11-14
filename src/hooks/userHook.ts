import useMainStore from '@/store/mainStore'
import axiosInstance from "@/axios.config"
import { UserType } from "@/store/users/types"
import useUserStore from "@/store/users/userStore"
import { parseEntity } from '@/store/utils/store'
import { useCookie } from 'vue-cookie-next'
import router from '@/router'
import mainHook from './mainHook'

export default function userHook() {
	const userStore = useUserStore()
	const mainStore = useMainStore()
	const { setCookie, getCookie, removeCookie } = useCookie()
	const { setThemeClass, setLightTheme } = mainHook()

	async function login({ email, password }: { email: string, password: string }) {
		try {
			mainStore.toggleIsLoading()
			const res = await axiosInstance.post('login', { email, password })
			const user: UserType = parseEntity(res.data)// TODO remove when SQL API has been deploy
			userStore.setCurrent(user)
			userStore.createOne(user)
			setCookie('userToken', user.token)
			if (user && userStore.isCurrentUserAdmin) {
				router.push('/adminDashboard')
			} else {
				router.push('/userDashboard')
			}
			mainStore.setIsLoggedIn()
		} catch (error) {
			console.error(error)
		}
		mainStore.toggleIsLoading()
	}

	function logout() {
		removeCookie('userToken')
		setLightTheme()
		mainStore.setIsLoggedOut()
		userStore.removeCurrent()
		mainStore.resetAllState()
		router.push('/')
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

	async function loginWithToken(token: string) {
		try {
			mainStore.toggleIsLoading()
			const res = await axiosInstance.post('token', { token })
			const user: UserType = parseEntity(res.data)
			await setThemeClass()
			userStore.setCurrent(user)
			userStore.createOne(user)
			mainStore.setIsLoggedIn()
		} catch (error) {
			console.error(error)
		}
		mainStore.toggleIsLoading()
	}

	return {
		login,
		logout,
		loginWithToken,
		routesIntermsOfUserRoles,
	}
}