import axiosInstance from "~/axios.config"
import { useMainStore } from "~/store/mainStore"

export default function newsleterHook() {
	const { toggleIsLoading } = useMainStore()
	async function newsletterSignup({ email, firstName, lastName, companyName }: { email: string, firstName: string, lastName: string, companyName: string }) {
		toggleIsLoading()
		try {

			const res = await axiosInstance.post('createOnenewsletter', { email, firstName, lastName, companyName })
			console.log(res, 'res')
		} catch (error) {
			// TODO toast
			console.error(error)
		}
		toggleIsLoading()
	}

	return {
		newsletterSignup,
	}
}