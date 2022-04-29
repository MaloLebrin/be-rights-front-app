import type { EmployeeType } from './types'
import createState from '@/store/utils/createState'
import createEntity from '@/store/utils/createEntity'

const entity = createEntity<EmployeeType>('employees')

export const employeState = createState<EmployeeType>(entity)

export function defaultEmployeeState() {
  return createState<EmployeeType>(entity)
}
