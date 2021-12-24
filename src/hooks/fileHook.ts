import APi from "@/helpers/api"
import { useFileStore, useUiStore, useUserStore } from "@/store"
import { FileTypeEnum } from "@/store/typesExported"

export function fileHook() {
	const { getCurrent } = useUserStore()
	const fileStore = useFileStore()
	const { setUIErrorToast } = useUiStore()
	const api = new APi(getCurrent?.token!)

	async function postOne(fileForm: FormData) {

		try {


		} catch (error) {
			console.error(error)
			setUIErrorToast()
		}
	}

	return {
		postOne,
	}
}