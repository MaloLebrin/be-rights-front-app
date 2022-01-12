import { BaseEntity } from "@/types/globals"
import { State } from "@/store/utils/types"
import { EmployeeType, EventType } from "../typesExported"

export interface AnswerType extends BaseEntity {
	hasSigned: boolean
	signetAt: Date
	reason: string
	employee: number | EmployeeType
	event: number | EventType
}

export interface AnswerState extends State<AnswerType> { }