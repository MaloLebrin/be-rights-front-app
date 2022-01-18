import APi, { PaginatedResponse } from "@/helpers/api"
import { useFileStore, useUiStore, useUserStore } from "@/store"
import { FileType, FileTypeEnum } from "@/store/typesExported"

export function fileHook() {
  const { getCurrent } = useUserStore()
  const { getAllIds: getAllFilesIds } = useFileStore()
  const fileStore = useFileStore()
  const { setUIErrorToast, IncLoading, DecLoading, setUISucessToast } = useUiStore()
  const api = new APi(getCurrent?.token!)

  async function postOne(fileForm: FormData, id?: number) {
    IncLoading()
    try {
      const res = await api.post(`file/${id}`, fileForm)
      fileStore.createOne(res as FileType)
      setUISucessToast("File uploaded successfully")
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

  async function fetchAll() {
    IncLoading()
    try {
      const res = await api.get("file")
      const { currentPage, data, limit, total }: PaginatedResponse<FileType> = res
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

  return {
    deleteOne,
    fetchAll,
    filteringFilesNotInStore,
    getTranslationFileType,
    patchOne,
    postOne,
  }
}