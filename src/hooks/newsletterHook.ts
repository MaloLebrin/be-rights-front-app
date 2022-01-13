import axiosInstance from "@/axios.config"
import { useUiStore } from "@/store"

export function newsleterHook() {
	const { IncLoading, DecLoading } = useUiStore()

	async function newsletterSignup({
		email,
		firstName,
		lastName,
		companyName
	}:
		{
			email: string,
			firstName: string | null,
			lastName: string | null,
			companyName: string | null
		}) {
		IncLoading()
		try {
			const res = await axiosInstance.post('createOnenewsletter', { email, firstName, lastName, companyName })

			if (res.status === 200) {
				// TODO toast
				DecLoading()
				return res.status
			}
		} catch (error) {
			// TODO toast
			console.error(error)
		}
		DecLoading()
	}

	return {
		newsletterSignup,
	}
}