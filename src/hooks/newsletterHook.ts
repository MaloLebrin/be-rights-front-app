import axiosInstance from "~/axios.config"


export default function newsleterHook() {

	async function newsletterSignup({ email, firstName, lastName, companyName }: { email: string, firstName: string, lastName: string, companyName: string }) {
		try {
			const res = await axiosInstance.post('createOnenewsletter', { email, firstName, lastName, companyName })
			console.log(res, 'res')
		} catch (error) {
			// TODO toast
			console.error(error)
		}
	}

	return {
		newsletterSignup,
	}
}