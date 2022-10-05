import type { AddressPostPayload, AddressType } from '@/types'
import { hasOwnProperty } from '@/utils'
import { useAddressStore, useUiStore } from '~~/store'

export default function addressHook() {
  const { IncLoading, DecLoading } = useUiStore()
  const { createOne, updateOne } = useAddressStore()
  const { $api, $toast } = useNuxtApp()

  async function fetchOne(id: number) {
    IncLoading()
    try {
      const res = await $api().get(`address/${id}`)
      const address = res as AddressType
      if (address) {
        createOne(address)
      }
    } catch (error) {
      console.error(error)
      $toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function postOne(payload: AddressPostPayload) {
    IncLoading()
    try {
      const res = await $api().post('address/', payload)
      const address = res as AddressType
      if (address) {
        createOne(address)
      }
    } catch (error) {
      console.error(error)
      $toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function patchOne(id: number, payload: Partial<AddressType>) {
    IncLoading()
    try {
      const res = await $api().patch(`address/${id}`, { address: payload })
      if (isAddressType(res)) {
        updateOne(id, res)
      }
    } catch (error) {
      console.error(error)
      $toast.error('Une erreur est survenue')
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
    patchOne,
    postOne,
  }
}
