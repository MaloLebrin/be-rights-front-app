import useMainStore from '@/store/mainStore'
import axiosInstance from "@/axios.config"
import { UserType } from "@/store/users/types"
import useUserStore from "@/store/users/userStore"
import { parseEntity } from '@/store/utils/store'
import { useCookie } from 'vue-cookie-next'
import router from '@/router'
import mainHook from './mainHook'
import useEventStore from '@/store/events/eventStore'
import { EventType } from '@/store/events/types'
import authHook from './authHook'
import APi from '@/helpers/api'
import { ThemeEnum } from '@/types/globals'

export default function userHook() {
	const userStore = useUserStore()
	const mainStore = useMainStore()
	const eventStore = useEventStore()
	const { setCookie } = useCookie()
	const api = new APi(userStore.entities.current?.token!)

	async function login({ email, password }: { email: string, password: string }) {
		try {
			mainStore.toggleIsLoading()
			const res = await axiosInstance.post('user/login', { email, password })
			// const user: UserType = parseEntity(res.data)// TODO remove when SQL API has been deploy
			const user: UserType = res.data
			if (user.events) {
				const userEvents = user.events
				eventStore.createMany(userEvents as unknown as EventType[])
				delete user.events
			}
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

	async function userToggleTheme(theme: ThemeEnum) {
		try {
			mainStore.toggleIsLoading()
			const id = userStore.entities.current?.id
			if (id) {
				const res = await api.patch(`user/theme/${id}`, { theme })
				userStore.updateOne(id, res as UserType)
			}
		} catch (error) {
			console.error(error)
		}
		mainStore.toggleIsLoading()
	}



	return {
		login,
		userToggleTheme,
	}
}