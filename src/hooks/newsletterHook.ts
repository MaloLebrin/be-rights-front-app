import axiosInstance from '@/axios.config'
import APi from '@/helpers/api'
import type { PaginatedResponse } from '@/helpers/api'
import type { NewsletterType } from '@/types'

export default function newsletterHook() {
  const { IncLoading, DecLoading } = useUiStore()
  const toast = useToast()
  const api = new APi()
  const newsletterStore = useNewsletterStore()
  const { createMany, deleteOne: deleteOneStore } = newsletterStore

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

  async function fetchAll(url?: string) {
    IncLoading()
    try {
      let finalUrl = 'newsletter'
      if (url) {
        finalUrl += `${url}`
      }

      const res = await api.get(finalUrl)
      const { data }: PaginatedResponse<NewsletterType> = res
      const missingNewsletters = newsletterStore.getMissingEntities(data)
      if (missingNewsletters.length > 0) {
        createMany(missingNewsletters)
      }
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function deleteOne(id: number) {
    IncLoading()
    try {
      await api.delete(`newsletter/${id}`)
      deleteOneStore(id)
      toast.success('Newsletter item supprimé avec succès')
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  return {
    deleteOne,
    fetchAll,
    newsletterSignup,
  }
}
