import axiosInstance from "@/axios.config"
import { useCookie } from 'vue-cookie-next'
import router from '@/router'
import APi, { PaginatedResponse } from '@/helpers/api'
import { ThemeEnum } from '@/types'
import { EmployeeType, EventType, FileType, UserType } from '@/store/typesExported'
import { useEmployeeStore, useEventStore, useFileStore, useMainStore, useUserStore } from "@/store"

export function userHook() {
	const userStore = useUserStore()
	const mainStore = useMainStore()
	const eventStore = useEventStore()
	const employeeStore = useEmployeeStore()
	const fileStore = useFileStore()
	const { setCookie } = useCookie()
	const api = new APi(userStore.entities.current?.token!)

	async function login({ email, password }: { email: string, password: string }) {
		try {
			mainStore.toggleIsLoading()
			const res = await axiosInstance.post('user/login', { email, password })
			const user = res.data as UserType
			storeEntitiesOnLoginOrToken(user)
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

	function storeEntitiesOnLoginOrToken(user: UserType) {
		if (user.events && user.events.length > 0) {
			const userEvents = user.events as EventType[]
			const eventsToStore = userEvents.filter(event => !eventStore.getAllIds.includes(event.id))
			eventStore.createMany(eventsToStore)
			user.events = eventsToStore.map(event => event.id)
		}
		if (user.employee && user.employee.length > 0) {
			const employees = user.employee as EmployeeType[]
			const employeesToStore = employees.filter(employee => !employeeStore.getAllIds.includes(employee.id))
			employeeStore.createMany(employeesToStore)
			user.employee = employeesToStore.map(employee => employee.id)
		}
		if (user.files && user.files.length > 0) {
			const files = user.files as FileType[]
			const filesToStore = files.filter(file => !fileStore.getAllIds.includes(file.id))
			fileStore.createMany(filesToStore)
			user.files = filesToStore.map(file => file.id)
		}
		userStore.setCurrent(user)
		userStore.createOne(user)
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
		storeEntitiesOnLoginOrToken,
	}
}