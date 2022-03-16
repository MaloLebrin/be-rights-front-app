import { BugReportType, EntitiesEnum, BugReportTypeEnum, BugReportCreationFormType } from "../../types/typesExported"
import createGetters from "../utils/createGetters"
import { bugState, baseCreationForm } from "./state"

export const useBugStore = defineStore(EntitiesEnum.BUGS_REPORTS, {
  state: () => ({
    ...bugState,
  }),
  getters: {
    ...createGetters<BugReportType>(bugState),
    getCreationForm: (state) => state.creationForm,
  },
  actions: {
    // actions common to all entities
    createOne(payload: BugReportType) {
      this.entities.byId[payload.id] = payload
      this.entities.allIds.push(payload.id)
    },
    createMany(payload: BugReportType[]) {
      payload.forEach(entity => this.createOne(entity))
    },
    setCurrent(payload: BugReportType) {
      this.entities.current = payload
    },
    removeCurrent() {
      this.entities.current = null
    },
    updateOne(id: number, payload: BugReportType): void {
      const entity = this.entities.byId[id]
      this.entities.byId[id] = {
        ...entity,
        ...payload,
      }
    },
    updateMany(payload: BugReportType[]): void {
      payload.forEach(entity => this.updateOne(entity.id, entity))
    },
    deleteOne(id: number) {
      delete this.entities.byId[id]
      this.entities.allIds = this.entities.allIds.filter(entityId => entityId !== id)
    },
    deleteMany(ids: number[]) {
      ids.forEach(id => this.deleteOne(id))
    },
    setActive(id: number) {
      if (!this.entities.active.includes(id)) {
        this.entities.active.push(id)
      }
    },
    resetActive() {
      this.entities.active = []
    },

    resetState() {
      this.entities.byId = {}
      this.entities.allIds = []
      this.entities.active = []
    },

    setCreationForm(payload: BugReportCreationFormType) {
      this.creationForm = payload
    },
    setCreationFormField(field: string, value: string | BugReportTypeEnum) {
      this.creationForm[field] = value
    },
    resetCreationForm() {
      console.log(baseCreationForm, 'baseCreationForm')
      this.creationForm = baseCreationForm
    },
  },
})