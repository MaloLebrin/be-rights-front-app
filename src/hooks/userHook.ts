import axiosInstance from "@/axios.config"
import { useCookie } from 'vue-cookie-next'
import router from '@/router'
import APi, { PaginatedResponse } from '@/helpers/api'
import { ThemeEnum } from '@/types'
import { EventType, UserType } from '@/store/typesExported'
import { useEventStore, useMainStore, useUserStore } from "@/store"

export function userHook() {
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
			const user = res.data as UserType
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

	async function fetchAll() {
		try {
			const res = await api.get('user')
			const { currentPage, data, limit, total }: PaginatedResponse<UserType> = res
			const events = data.reduce((acc, user) => [...acc, ...user.events as EventType[]], [] as EventType[])
			const missingEventIds = events.map(event => event.id).filter(id => !eventStore.getAllIds.includes(id))
			if (missingEventIds.length > 0) {
				const missingEvents = events.filter(event => missingEventIds.includes(event.id))
				eventStore.createMany(missingEvents)
			}

			userStore.createMany(data)

		} catch (error) {
			console.error(error)
		}
	}



	return {
		login,
		userToggleTheme,
		fetchAll,
	}
}