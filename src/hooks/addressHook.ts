import API from '@/helpers/api'
import type { AddressPostPayload, AddressType } from '@/types'
import { hasOwnProperty } from '@/utils'

export default function addressHook() {
  const { IncLoading, DecLoading } = useUiStore()
  const toast = useToast()
  const addressStore = useAddressStore()
  const api = new API()

  async function fetchOne(id: number) {
    IncLoading()
    try {
      const res = await api.get(`address/${id}`)
      const address = res as AddressType
      if (address) {
        addressStore.createOne(address)
      }
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function postOne(payload: AddressPostPayload) {
    IncLoading()
    try {
      const res = await api.post('/', payload)
      const address = res as AddressType
      if (address) {
        addressStore.createOne(address)
      }
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  function isAddressType(arg: any): arg is AddressType {
    return hasOwnProperty(arg, 'addressLine')
      && hasOwnProperty(arg, 'postalCode')
      && hasOwnProperty(arg, 'city')
      && hasOwnProperty(arg, 'country')
  }

  return {
    fetchOne,
    isAddressType,
    postOne,
  }
}
