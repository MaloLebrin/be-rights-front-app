import createState from '~/store/utils/createState'
import createEntity from '~/store/utils/createEntity'
import { EmployeeType } from './types'

const entity = createEntity<EmployeeType>('employees')

export const employeState = createState<EmployeeType>(entity)