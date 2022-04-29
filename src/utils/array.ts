import type { EmployeeType, UserType } from '@/types/typesExported'

/**
 * Unique an Array
 *
 * @category Array
 */
export function uniq<T>(array: readonly T[]): T[] {
  return Array.from(new Set(array))
}

export function alphabetical(entityArray: UserType[] | EmployeeType[]) {
  return entityArray.sort((a, b) => {
    const lastNameA = a.lastName.toLowerCase()
    const lastNameB = b.lastName.toLowerCase()
    if (lastNameA < lastNameB) {
      return -1
    }
    if (lastNameA > lastNameB) {
      return 1
    }
    return 0
  })
}
