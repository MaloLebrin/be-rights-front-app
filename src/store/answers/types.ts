import { BaseEntity } from "@/types/globals"
import { State } from "@/store/utils/types"
import { EmployeeType, EventType } from "../../types/typesExported"

export interface AnswerType extends BaseEntity {
  hasSigned: boolean
  signetAt: Date
  reason: string
  employee: number | EmployeeType
  event: number | EventType
}

export type AnswerFormType = Omit<AnswerType, 'id' | 'createdAt' | 'updatedAt'>

export interface AnswerState extends State<AnswerType> { }