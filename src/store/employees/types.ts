import { BaseEntity } from "@/types/globals"
import { UserType } from "@/store/users/types";
import { State } from "@/store/utils/types"
import { AnswerType, FileType } from "../typesExported";

export interface EmployeeType extends BaseEntity {
  email: string
  phone: string
  firstName: string
  lastName: string
  hasSigned: boolean
  signedAt: Date
  createdByUser: null | number | UserType
  event?: number
  files?: FileType[] | number[]
  answers?: AnswerType[] | number[]
}

export interface EmployeeState extends State<EmployeeType> { }