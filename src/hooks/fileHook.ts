import type { PaginatedResponse } from '@/helpers/api'
import APi from '@/helpers/api'
import type { FileType, UserType } from '@/types/typesExported'
import { FileTypeEnum } from '@/types/typesExported'

export default function fileHook() {
  const { updateOne, setCurrent } = useUserStore()
  const userStore = useUserStore()
  const { getAllIds: getAllFilesIds } = useFileStore()
  const fileStore = useFileStore()
  const { setUIErrorToast, IncLoading, DecLoading, setUISucessToast } = useUiStore()
  const api = new APi(userStore.getCurrentUserToken!)

  async function postOne(fileForm: FormData, id?: number) {
    try {
      const res = await api.post(`file/${id}`, fileForm)
      fileStore.createOne(res as FileType)
      setUISucessToast('File uploaded successfully')
      return res
    } catch (error) {
      console.error(error)
      setUIErrorToast()
    }
  }

  async function postProfilePicture(fileForm: FormData) {
    IncLoading()
    try {
      const res = await api.post('file/profile', fileForm)
      const newFile = res as FileType
      if (newFile && newFile.createdByUser) {
        fileStore.createOne(newFile)
        const response = await api.get(`user/${newFile.createdByUser}`)
        const user = response as UserType
        if (user) {
          updateOne(user.id, user)
          if (userStore.getCurrentUserId === user.id) {
            setCurrent(user)
          }
        }
        setUISucessToast('File uploaded successfully')
      }
    } catch (error) {
      console.error(error)
      setUIErrorToast()
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

      const res = await api.get(finalUrl)
      const { data }: PaginatedResponse<FileType> = res
      const files = filteringFilesNotInStore(data)
      if (files.length > 0) {
        fileStore.createMany(files)
      }
    } catch (error) {
      console.error(error)
      setUIErrorToast()
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

      default:
        return 'Autre'
    }
  }

  async function deleteOne(id: number) {
    IncLoading()
    try {
      await api.delete(`file/${id}`)
      fileStore.deleteOne(id)
      setUISucessToast('Fichier supprimé avec succès')
    } catch (error) {
      console.error(error)
      setUIErrorToast()
    }
    DecLoading()
  }

  async function patchOne(file: FileType) {
    IncLoading()
    try {
      const res = await api.patch(`file/${file.id}`, { file })
      const fileUpdated = res as FileType
      fileStore.updateOne(fileUpdated.id, fileUpdated)
      setUISucessToast('file successfully updated')
    } catch (error) {
      console.error(error)
      setUIErrorToast()
    }
    DecLoading()
  }

  async function fetchAllByUserId(userId: number) {
    IncLoading()
    try {
      const res = await api.get(`file/user/${userId}`)
      const files = res as FileType[]
      if (files.length > 0) {
        const filesNotInStore = filteringFilesNotInStore(files)
        if (filesNotInStore.length > 0) {
          fileStore.createMany(filesNotInStore)
        }
      }
    } catch (error) {
      console.error(error)
      setUIErrorToast()
    }
    DecLoading()
  }

  async function fetchAllForEvent(eventId: number) {
    IncLoading()
    try {
      const res = await api.get(`file/event/${eventId}`)
      const files = res as FileType[]
      if (files.length > 0) {
        const filesNotInStore = filteringFilesNotInStore(files)
        if (filesNotInStore.length > 0) {
          fileStore.createMany(filesNotInStore)
        }
      }
    } catch (error) {
      console.error(error)
      setUIErrorToast()
    }
    DecLoading()
  }

  return {
    deleteOne,
    fetchAll,
    fetchAllByUserId,
    fetchAllForEvent,
    filteringFilesNotInStore,
    getTranslationFileType,
    patchOne,
    postOne,
    postProfilePicture,
  }
}
