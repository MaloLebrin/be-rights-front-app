import { EmployeeType } from "~/store/employees/types"

export default function employeeHook() {

	function getEmployeeStatusSignature(employee: EmployeeType): string {
		if (employee.hasSigned) {
			return 'Accepté'
		} else {
			if (employee.signetAt) {
				return 'Refusé'
			}
			return 'En attente'
		}
	}

	function getEmployeeStatusColor(employee: EmployeeType): string {
		if (employee.hasSigned) {
			return 'text-green'
		} else {
			if (employee.signetAt) {
				return 'text-red'
			}
			return 'text-orange'
		}
	}

	return {
		getEmployeeStatusSignature,
		getEmployeeStatusColor,
	}
}