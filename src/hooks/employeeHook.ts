import { EmployeeType } from "@/store/employees/types"
import useEmployeeStore from "@/store/employees/employeStore"
import useUserStore from '@/store/users/userStore'
import API from "@/helpers/api"

export default function employeeHook() {
	const employeeStore = useEmployeeStore()
	const userStore = useUserStore()
	const api = new API(userStore.entities.current?.token!)

	function getEmployeeStatusSignature(employee: EmployeeType): string {
		if (employee.hasSigned) {
			return 'Accepté'
		} else {
			if (employee.signedAt) {
				return 'Refusé'
			}
			return 'En attente'
		}
	}

	function getEmployeeStatusColor(employee: EmployeeType): string {
		if (employee.hasSigned) {
			return 'text-green'
		} else {
			if (employee.signedAt) {
				return 'text-red'
			}
			return 'text-orange'
		}
	}

	async function getEmployeesByEventId(eventId: number) {
		const res: any = await api.get(`employee/event/${eventId}`)
		const employeeArray = res.data as EmployeeType[]
		const employees: EmployeeType[] = employeeArray.map(employe => ({
			...employe,
			event: eventId,
		}))
		employeeStore.createMany(employees)
	}

	return {
		getEmployeeStatusSignature,
		getEmployeeStatusColor,
		getEmployeesByEventId,
	}
}