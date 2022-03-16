import APi, { PaginatedResponse } from "@/helpers/api"
import { useFileStore, useUiStore, useUserStore } from "@/store"
import { FileType, FileTypeEnum } from "@/store/typesExported"

export default function fileHook() {
  const { getCurrent } = useUserStore()
  const { getAllIds: getAllFilesIds } = useFileStore()
  const fileStore = useFileStore()
  const { setUIErrorToast, IncLoading, DecLoading, setUISucessToast } = useUiStore()
  const api = new APi(getCurrent?.token!)

  async function postOne(fileForm: FormData, id?: number) {
    try {
      const res = await api.post(`file/${id}`, fileForm)
      fileStore.createOne(res as FileType)
      setUISucessToast("File uploaded successfully")
      return res
    } catch (error) {
      console.error(error)
      setUIErrorToast()
    }
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
      setUISucessToast(`${files.length} files fetched successfully`)
    } catch (error) {
      console.error(error)
      setUIErrorToast()
    }
    DecLoading()
  }

  function getTranslationFileType(fileType: FileTypeEnum) {
    switch (fileType) {
      case FileTypeEnum.LOGO:
        return "Logo"
      case FileTypeEnum.MODEL:
        return "Modèle"

      case FileTypeEnum.IMAGE_RIGHT:
        return 'Droit à l\'image'

      default:
        return "Autre"
    }
  }

  async function deleteOne(id: number) {
    IncLoading()
    try {
      await api.delete(`file/${id}`)
      fileStore.deleteOne(id)
      setUISucessToast("Fichier supprimé avec succès")
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
      setUISucessToast(`${files.length} files fetched successfully`)
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
    filteringFilesNotInStore,
    getTranslationFileType,
    patchOne,
    postOne,
  }
}