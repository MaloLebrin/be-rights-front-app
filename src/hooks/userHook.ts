import axiosInstance from "@/axios.config"
import { useCookie } from 'vue-cookie-next'
import router from '@/router'
import APi, { PaginatedResponse } from '@/helpers/api'
import { RoleEnum, ThemeEnum } from '@/types'
import { EmployeeType, EventType, FileType, UserType } from '@/store/typesExported'
import { useEventStore, useFileStore, useMainStore, useUiStore, useUserStore } from "@/store"
import { employeeHook } from "."

export function userHook() {
	const userStore = useUserStore()
	const mainStore = useMainStore()
	const eventStore = useEventStore()
	const fileStore = useFileStore()
	const { setUIErrorToast, setUISucessToast, IncLoading, DecLoading } = useUiStore()
	const { storeEmployeeRelationsEntities } = employeeHook()
	const { setCookie } = useCookie()
	const api = new APi(userStore.entities.current?.token!)

	async function login({ email, password }: { email: string, password: string }) {
		try {
			IncLoading()
			const res = await axiosInstance.post('user/login', { email, password })
			const user = res.data as UserType
			storeUsersEntities(user)
			setCookie('userToken', user.token)
			if (user && userStore.isCurrentUserAdmin) {
				router.push('/adminDashboard')
			} else {
				router.push('/userDashboard')
			}
			setUISucessToast('Vous êtes connecté')
			mainStore.setIsLoggedIn()
		} catch (error) {
			console.error(error)
			setUIErrorToast()
		}
		DecLoading()
	}

	async function register({ companyName, email, password, firstName, lastName, roles }: { companyName: string, email: string, password: string, firstName: string, lastName: string, roles: RoleEnum }) {
		try {
			IncLoading()
			const res = await axiosInstance.post('user', { companyName, email, password, firstName, lastName, roles })
			const user = res.data as UserType
			storeUsersEntities(user)
			setCookie('userToken', user.token)
			if (user && userStore.isCurrentUserAdmin) {
				router.push('/adminDashboard')
			} else {
				router.push('/userDashboard')
			}
			setUISucessToast('Vous êtes inscrit avec succès')
			mainStore.setIsLoggedIn()
		} catch (error) {
			console.error(error)
			setUIErrorToast()
		}
		DecLoading()
	}

	function storeUsersEntities(user: UserType, isUserToSetCurrent = true) {
		if (user.events && user.events.length > 0) {
			const userEvents = user.events as EventType[]
			const eventsToStore = userEvents.filter(event => !eventStore.getAllIds.includes(event.id))
			eventStore.createMany(eventsToStore)
			user.events = eventsToStore.map(event => event.id)
		}
		if (user.employee && user.employee.length > 0) {
			const employeesToStore = storeEmployeeRelationsEntities(user.employee as EmployeeType[])
			user.employee = employeesToStore.map(employee => employee.id)
		}
		if (user.files && user.files.length > 0) {
			const files = user.files as FileType[]
			const filesToStore = files.filter(file => !fileStore.getAllIds.includes(file.id))
			fileStore.createMany(filesToStore)
			user.files = filesToStore.map(file => file.id)
		}
		if (isUserToSetCurrent) {
			userStore.setCurrentUser(user)
		}
		userStore.createOne(user)
	}

	function storeUsersEntitiesForManyUsers(users: UserType[]): void {
		if (users.length > 0) {
			const events = users.reduce((acc, user) => [...acc, ...user.events as EventType[]], [] as EventType[])
			const eventsToStore = events.filter(event => !eventStore.getAllIds.includes(event.id))
			if (eventsToStore.length > 0) {
				eventStore.createMany(eventsToStore)
			}

			const employees = users.reduce((acc, user) => [...acc, ...user.employee as EmployeeType[]], [] as EmployeeType[])
			storeEmployeeRelationsEntities(employees)

			const files = users.reduce((acc, user) => [...acc, ...user.files as FileType[]], [] as FileType[])
			const filesToStore = files.filter(file => !fileStore.getAllIds.includes(file.id))
			if (filesToStore.length > 0) {
				fileStore.createMany(filesToStore)
			}

			const missingsUsers = users.filter(user => !userStore.getAllIds.includes(user.id))
			if (missingsUsers.length > 0) {
				const usersToStore = missingsUsers.map(user => {
					const userEvents = user.events as EventType[]
					const userEmployees = user.employee as EmployeeType[]
					const userFiles = user.files as FileType[]
					return {
						...user,
						events: userEvents.map(event => event.id),
						employee: userEmployees.map(employee => employee.id),
						files: userFiles.map(file => file.id)
					}
				})
				userStore.createMany(usersToStore)
			}
		}
	}

	async function userToggleTheme(theme: ThemeEnum) {
		try {
			IncLoading()
			const id = userStore.entities.current?.id
			if (id) {
				const res = await api.patch(`user/theme/${id}`, { theme })
				userStore.updateOne(id, res as UserType)
			}
		} catch (error) {
			console.error(error)
			setUIErrorToast()
		}
		DecLoading()
	}

	async function fetchAll() {
		try {
			const res = await api.get('user/?limit=999999')
			const { data }: PaginatedResponse<UserType> = res
			storeUsersEntitiesForManyUsers(data)
			setUISucessToast('Utilisateurs récupérés avec succès')
		} catch (error) {
			setUIErrorToast()
			console.error(error)
		}
		DecLoading()
	}

	async function deleteUser(id: number) {
		try {
			IncLoading()
			const res = await api.delete(`user/${id}`)
			console.log(res, 'res')
			userStore.deleteOne(id)
			setUISucessToast('Utilisateurs à été supprimé avec succès')
		} catch (error) {
			setUIErrorToast()
			console.error(error)
		}
		DecLoading()
	}

	async function patchOne(id: number, user: UserType) {
		IncLoading()
		try {
			const res = await api.patch(`user/${id}`, { user })
			userStore.updateOne(id, res as UserType)
			setUISucessToast('Utilisateur à été modifié avec succès')
		} catch (error) {
			setUIErrorToast()
			console.error(error)
		}
		DecLoading()
	}

	return {
		deleteUser,
		fetchAll,
		login,
		patchOne,
		register,
		storeUsersEntities,
		userToggleTheme,
	}
}