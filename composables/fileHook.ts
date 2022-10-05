import type { PaginatedResponse } from '@/helpers/api'
import type { FileType } from '@/types'
import { FileTypeEnum } from '@/types'
import { hasOwnProperty } from '@/utils'
import { useFileStore, useUiStore, useUserStore } from '~~/store'

export default function fileHook() {
  const { updateOne, setCurrent } = useUserStore()
  const userStore = useUserStore()
  const { getAllIds: getAllFilesIds } = useFileStore()
  const fileStore = useFileStore()
  const { IncLoading, DecLoading } = useUiStore()
  const { $toast, $api } = useNuxtApp()

  async function postOne(fileForm: FormData, id?: number) {
    try {
      const res = await $api().post(`file/${id}`, fileForm)
      if (isFileType(res)) {
        fileStore.createOne(res)
        $toast.success('fichier créé avec succès')
      }
      return res
    } catch (error) {
      console.error(error)
      $toast.error('Une erreur est survenue')
    }
  }

  async function postProfilePicture(fileForm: FormData) {
    const { isUserType } = userHook()
    IncLoading()
    try {
      const res = await $api().post('file/profile', fileForm)
      if (isFileType(res)) {
        if (res && res.createdByUser) {
          fileStore.createOne(res)
          const user = await $api().get(`user/${res.createdByUser}`)
          if (user && isUserType(user)) {
            updateOne(user.id, user)
            if (userStore.getCurrentUserId === user.id) {
              setCurrent(user)
            }
          }
          $toast.success('Photo de profile créé avec succès')
        }
      }
    } catch (error) {
      console.error(error)
      $toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function postLogo(fileForm: FormData) {
    IncLoading()
    try {
      const res = await $api().post('file/logo', fileForm)
      if (res && res.createdByUser && isFileType(res)) {
        fileStore.createOne(res)
        $toast.success('Logo créé avec succès')
      }
    } catch (error) {
      console.error(error)
      $toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  function filteringFilesNotInStore(files: FileType[]) {
    if (files.length > 0) {
      return files.filter(file => !getAllFilesIds.includes(file.id))
    }
    return []
  }

  async function fetchAll(url?: string) {
    IncLoading()
    try {
      let finalUrl = 'file'
      if (url) {
        finalUrl += `${url}`
      }

      const res = await $api().get(finalUrl)
      const { data }: PaginatedResponse<FileType> = res
      const files = filteringFilesNotInStore(data)
      if (files.length > 0) {
        fileStore.createMany(files)
      }
    } catch (error) {
      console.error(error)
      $toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  function getTranslationFileType(fileType: FileTypeEnum) {
    switch (fileType) {
      case FileTypeEnum.LOGO:
        return 'Logo'
      case FileTypeEnum.MODEL:
        return 'Modèle'

      case FileTypeEnum.IMAGE_RIGHT:
        return 'Droit à l\'image'

      case FileTypeEnum.PROFILE_PICTURE:
        return 'Photo de profil'

      case FileTypeEnum.BUG_REPORT:
        return 'Capture d\'écran de bug'

      default:
        return 'Autre'
    }
  }

  async function deleteOne(id: number) {
    IncLoading()
    try {
      await $api().delete(`file/${id}`)
      fileStore.deleteOne(id)
      $toast.success('Fichier supprimé avec succès')
    } catch (error) {
      console.error(error)
      $toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function patchOne(file: FileType) {
    IncLoading()
    try {
      const res = await $api().patch(`file/${file.id}`, { file })
      if (res && isFileType(res)) {
        fileStore.updateOne(res.id, res)
        $toast.success('fichier modifié avec succès')
      }
    } catch (error) {
      console.error(error)
      $toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function fetchAllByUserId(userId: number) {
    IncLoading()
    try {
      const res = await $api().get(`file/user/${userId}`)
      const files = res as FileType[]
      if (files.length > 0) {
        const filesNotInStore = filteringFilesNotInStore(files)
        if (filesNotInStore.length > 0) {
          fileStore.createMany(filesNotInStore)
        }
      }
    } catch (error) {
      console.error(error)
      $toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function fetchAllForEvent(eventId: number) {
    IncLoading()
    try {
      const res = await $api().get(`file/event/${eventId}`)
      const files = res as FileType[]
      if (files.length > 0) {
        const filesNotInStore = filteringFilesNotInStore(files)
        if (filesNotInStore.length > 0) {
          fileStore.createMany(filesNotInStore)
        }
      }
    } catch (error) {
      console.error(error)
      $toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function fetchLogoByUserId(userId: number) {
    IncLoading()
    try {
      const res = await $api().get(`file?filters[type]=${FileTypeEnum.LOGO}&filters[createdByUser]=${userId}`)
      const { data }: PaginatedResponse<FileType> = res
      const files = filteringFilesNotInStore(data)
      if (files.length > 0) {
        fileStore.createMany(files)
      }
    } catch (error) {
      console.error(error)
      $toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  function isNotPersonnalFile(file: FileType) {
    return ![FileTypeEnum.BUG_REPORT, FileTypeEnum.PROFILE_PICTURE, FileTypeEnum.LOGO].includes(file.type)
  }

  function isFileType(file: any): file is FileType {
    return hasOwnProperty(file, 'fileName')
  }

  return {
    deleteOne,
    fetchAll,
    fetchAllByUserId,
    fetchAllForEvent,
    fetchLogoByUserId,
    filteringFilesNotInStore,
    getTranslationFileType,
    isFileType,
    isNotPersonnalFile,
    patchOne,
    postOne,
    postProfilePicture,
    postLogo,
  }
}
