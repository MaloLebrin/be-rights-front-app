import APi from "@/helpers/api"
import { useFileStore, useUiStore, useUserStore } from "@/store"
import { FileType, FileTypeEnum } from "@/store/typesExported"

export function fileHook() {
	const { getCurrent } = useUserStore()
	const fileStore = useFileStore()
	const { setUIErrorToast } = useUiStore()
	const api = new APi(getCurrent?.token!)

	async function postOne(fileForm: FormData) {

		try {
			const res = await api.post("file", fileForm)
			console.log(res, 'res')
			fileStore.createOne(res as FileType)

		} catch (error) {
			console.error(error)
			setUIErrorToast()
		}
	}

	return {
		postOne,
	}
}