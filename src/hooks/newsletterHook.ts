import axiosInstance from '@/axios.config'

export default function newsletterHook() {
  const { IncLoading, DecLoading } = useUiStore()
  const toast = useToast()

  async function newsletterSignup({
    email,
    firstName,
    lastName,
    companyName,
  }:
    {
      email: string
      firstName: string | null
      lastName: string | null
      companyName: string | null
    }) {
    IncLoading()
    try {
      const res = await axiosInstance.post('newsletter/', { email, firstName, lastName, companyName })

      if (res.status === 200) {
        DecLoading()
        return res.status
      }
    } catch (error) {
      toast.error('Une erreur est survenue')
      console.error(error)
    }
    DecLoading()
  }

  return {
    newsletterSignup,
  }
}
