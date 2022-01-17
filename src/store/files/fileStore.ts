import { defineStore } from "pinia"
import createActions from "@/store/utils/createActions"
import createGetters from "@/store/utils/createGetters"
import { EntitiesEnum } from "@/types/globals"
import { fileState } from "./state"
import { FileState, FileType } from "./types"

export const useFileStore = defineStore(EntitiesEnum.FILES, {
	state: (): FileState => ({
		...fileState
	}),
	actions: {
		...createActions<FileType>(fileState)
	},
	getters: {
		...createGetters<FileType>(fileState),
		getAllFiles: (state) => Object.values(state.entities.byId),
	}
})
