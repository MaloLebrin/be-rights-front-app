import { defineStore } from "pinia"
import createGetters from "@/store/utils/createGetters"
import { EntitiesEnum } from "@/types/globals"
import { fileState } from "./state"
import { FileState, FileType } from "./types"

export const useFileStore = defineStore(EntitiesEnum.FILES, {
  state: (): FileState => ({
    ...fileState
  }),
  actions: {
    // actions common to all entities
    createOne(payload: FileType) {
      this.entities.byId[payload.id] = payload
      this.entities.allIds.push(payload.id)
    },
    createMany(payload: FileType[]) {
      payload.forEach(entity => this.createOne(entity))
    },
    setCurrent(payload: FileType) {
      this.entities.current = payload
    },
    removeCurrent() {
      this.entities.current = null
    },
    updateOne(id: number, payload: FileType): void {
      const entity = this.entities.byId[id]
      this.entities.byId[id] = {
        ...entity,
        ...payload,
      }
    },
    updateMany(payload: FileType[]): void {
      payload.forEach(entity => this.updateOne(entity.id, entity))
    },
    deleteOne(id: number) {
      delete this.entities.byId[id]
      this.entities.allIds = this.entities.allIds.filter(entityId => entityId !== id)
    },
    deleteMany(ids: number[]) {
      ids.forEach(id => this.deleteOne(id))
    },
    resetState() {
      this.entities.byId = {}
      this.entities.allIds = []
      this.entities.active = []
      this.entities.current = null
    },
    setActive(id: number) {
      if (!this.entities.active.includes(id)) {
        this.entities.active.push(id)
      }
    },
    resetActive() {
      this.entities.active = []
    },

  },
  getters: {
    ...createGetters<FileType>(fileState),
  }
})

export default useFileStore
