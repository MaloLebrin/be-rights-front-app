import { EntitiesEnum } from "@/types"
import { defineStore } from "pinia"
import { tableState } from "./state"

export const useTablestore = defineStore(EntitiesEnum.TABLE, {
  state: () => ({ ...tableState }),
  getters: {

  },
  actions: {},
})