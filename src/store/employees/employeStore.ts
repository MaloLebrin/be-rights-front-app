import { defineStore } from "pinia"
import createActions from "@/store/utils/createActions"
import { EntitiesEnum } from "@/types/globals"
import { employeState } from "./state"
import { EmployeeState, EmployeeType } from "./types"
import { useUiStore, useUserStore } from ".."
import APi from "@/helpers/api"
import createGetters from "../utils/createGetters"

export const useEmployeeStore = defineStore(EntitiesEnum.EMPLOYEES, {
  state: (): EmployeeState => ({
    ...employeState,
  }),
  getters: {
    ...createGetters<EmployeeType>(employeState),

    // bellow getters in this specific store,
    getAllByEventId: (state) => (eventId: number) => {
      return Object.values(state.entities.byId).filter(employee => employee.event === eventId)
    },
    getEmployeesByUserId: (state) => {
      return (userId: number) => Object.values(state.entities.byId).filter(employee => employee.createdByUser === userId)
    },

  },
  actions: {
    // actions common to all entities
    createOne(payload: EmployeeType) {
      this.entities.byId[payload.id] = payload
      this.entities.allIds.push(payload.id)
    },
    createMany(payload: EmployeeType[]) {
      payload.forEach(entity => this.createOne(entity))
    },
    setCurrent(payload: EmployeeType) {
      this.entities.current = payload
    },
    removeCurrent() {
      this.entities.current = null
    },
    updateOne(id: number, payload: EmployeeType): void {
      const entity = this.entities.byId[id]
      this.entities.byId[id] = {
        ...entity,
        ...payload,
      }
    },
    updateMany(payload: EmployeeType[]): void {
      payload.forEach(entity => this.updateOne(entity.id, entity))
    },
    deleteOne(id: number) {
      delete this.entities.byId[id]
      this.entities.allIds = this.entities.allIds.filter(entityId => entityId !== id)
    },
    deleteMany(ids: number[]) {
      ids.forEach(id => this.deleteOne(id))
    },

    // TODO refacto in hook
    async postOne(employee: EmployeeType, userId: number) {
      const { setUISucessToast, setUIErrorToast } = useUiStore()
      try {
        const userStore = useUserStore()
        const api = new APi(userStore.entities.current?.token!)
        const res = await api.post(`employee/${userId}`, { employee })
        const data = res as EmployeeType
        const user = userStore.getOne(userId)
        const userEmployee = user.employee as number[]
        userStore.updateOne(userId, {
          ...user,
          employee: [...userEmployee, data.id],
        })
        this.createOne(data)
        setUISucessToast('Destinataire créé avec succès')
      } catch (error) {
        console.error(error)
        setUIErrorToast()
      }
    },

    // TODO refacto in hook
    async postManyForEvent(employees: EmployeeType[], eventId: number, userId: number) {
      const { setUISucessToast, setUIErrorToast } = useUiStore()
      try {
        const userStore = useUserStore()
        const api = new APi(userStore.entities.current?.token!)
        const res = await api.post<EmployeeType[]>(`employee/manyonevent/${eventId}/${userId}`, employees)
        const data = res as EmployeeType[]
        const employeeIds = data.map(employee => employee.id)
        const user = userStore.getOne(userId)
        const userEmployee = user.employee as number[]
        userStore.updateOne(userId, {
          ...user,
          employee: [...userEmployee, ...employeeIds],
        })
        this.createMany(data)
        setUISucessToast('Destinataires créés avec succès')
      } catch (error) {
        console.error(error)
        setUIErrorToast()
      }
    },

  },
})
