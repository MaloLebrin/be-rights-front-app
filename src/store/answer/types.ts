import type { EmployeeType, EventType } from '../../types/typesExported'
import type { BaseEntity } from '@/types/globals'
import type { State } from '@/store/utils/types'

export interface AnswerType extends BaseEntity {
  hasSigned: boolean
  signetAt: Date
  reason: string
  employee: number | EmployeeType
  event: number | EventType
}

export type AnswerFormType = Omit<AnswerType, 'id' | 'createdAt' | 'updatedAt'>

export interface AnswerState extends State<AnswerType> { }
