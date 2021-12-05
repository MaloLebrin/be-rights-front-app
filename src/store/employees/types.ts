import { BaseEntity } from "@/types/globals"
import { UserType } from "@/store/users/types";
import { State } from "@/store/utils/types"

export interface EmployeeType extends BaseEntity {
	email: string
	phone: string
	firstName: string
	lastName: string
	hasSigned: boolean
	signedAt: Date
	createdByUser: null | number | UserType //TODO fix this
	event?: number
}

export interface EmployeeState extends State<EmployeeType> { }