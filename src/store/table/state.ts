import type { TableState } from './types'

export const tableState: TableState = {
  currentPage: 1,
  perPage: 100,
  totalPages: 0,
  orderBy: '',
  orderDir: '',
  filters: null,
  search: '',
}
