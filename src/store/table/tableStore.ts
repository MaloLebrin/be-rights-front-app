import { EntitiesEnum } from "@/types"
import { defineStore } from "pinia"
import { tableState } from "./state"
import { TableState } from "./types"

export const useTablestore = defineStore(EntitiesEnum.TABLE, {
  state: () => ({ ...tableState }),
  getters: {
    getTableState: (state) => state,
    getCurrentPage: (state) => state.currentPage,
    getPerPage: (state) => state.perPage,
    getTotalPages: (state) => state.totalPages,
    getOrderBy: (state) => state.orderBy,
    getOrderDir: (state) => state.orderDir,
    getFilters: (state) => state.filters,
    getSearch: (state) => state.search,
    getFinalUrl: (state) => {
      let url: string | null = null
      if (state.search) {
        url = `search=${state.search}`
      }
      if (state.filters) {
        Object.keys(state.filters).forEach(field => {
          if (state.filters && state.filters[field]) {
            if (url && url.length > 0) {
              url += `filters[${field}]=${state.filters[field]}`
            } else {
              url = `filters[${field}]=${state.filters[field]}`
            }
          }
        })
      }
      return url ? `?${url}&limit=${state.perPage}` : `?limit=${state.perPage}`
    },
  },
  actions: {
    resetTableState() {
      this.$reset()
    },

    setTableState(options: TableState) {
      this.currentPage = options.currentPage
      this.perPage = options.perPage
      this.totalPages = options.totalPages
      this.orderBy = options.orderBy
      this.orderDir = options.orderDir
      this.filters = options.filters
    },

    setSearch(search: string) {
      this.search = search
    },

    setFilters(filters: Record<string, string | string[]> | null) {
      this.search = ''
      this.filters = {
        ...filters,
      }
    },
  },
})