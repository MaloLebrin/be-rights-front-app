import APi from "@/helpers/api"
import { useFileStore, useUiStore, useUserStore } from "@/store"
import { FileType } from "@/store/typesExported"

export function fileHook() {
	const { getCurrent } = useUserStore()
	const { getAllIds: getAllFilesIds } = useFileStore()
	const fileStore = useFileStore()
	const { setUIErrorToast, IncLoading, DecLoading } = useUiStore()
	const api = new APi(getCurrent?.token!)

	async function postOne(fileForm: FormData) {
		IncLoading()
		try {
			const res = await api.post("file", fileForm)
			fileStore.createOne(res as FileType)
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

	return {
		postOne,
		filteringFilesNotInStore,
	}
}