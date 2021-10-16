import { useMainStore } from '@/store/mainStore'
import axiosInstance from "@/axios.config"
import { UserType } from "@/store/users/types"
import { useUserStore } from "@/store/users/userStore"

export default function userHook() {
	const userStore = useUserStore()
	const mainStore = useMainStore()

	async function login({ email, password }: { email: string, password: string }) {
		try {
			mainStore.toggleIsLoading()
			const res = await axiosInstance.post('url', { email, password })
			userStore.setCurrent(res as unknown as UserType)
			userStore.createOne(res as unknown as UserType)
			mainStore.setIsLoggedIn()
			mainStore.toggleIsLoading()
			return res
		} catch (error) {
			console.error(error)
		}
	}
	return {
		login,
	}
}