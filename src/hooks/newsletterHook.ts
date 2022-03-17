import axiosInstance from "@/axios.config"

export default function newsletterHook() {
  const { IncLoading, DecLoading, setUISucessToast, setUIErrorToast } = useUiStore()

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
        setUISucessToast('Votre inscription a bien été prise en compte')
        DecLoading()
        return res.status
      }
    } catch (error) {
      setUIErrorToast()
      console.error(error)
    }
    DecLoading()
  }

  return {
    newsletterSignup,
  }
}