import axiosInstance from "~/axios.config"
import useMainStore from "~/store/mainStore"

export default function newsleterHook() {
	const { toggleIsLoading } = useMainStore()
	async function newsletterSignup({ email, firstName, lastName, companyName }: { email: string, firstName: string | null, lastName: string | null, companyName: string | null }) {
		toggleIsLoading()
		try {

			const res = await axiosInstance.post('createOnenewsletter', { email, firstName, lastName, companyName })
			console.log(res, 'res')
			if (res.status === 200) {
				// TODO toast
				toggleIsLoading()
				return res.status
			}
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