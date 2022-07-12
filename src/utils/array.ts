import { getType, isNumber } from './basics'
import type { EmployeeType, UserType } from '@/types'

/**
 * Returns true if `value` is an array.
 *
 * @param value any
 * @returns `true` || `false`
 */
export function isArray(value: any): value is any[] {
  return getType(value) === 'Array'
}

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

/**
 * Returns true if `value` is an array of numbers.
 *
 * @param value any
 * @returns `true` || `false`
 */
export function isArrayOfNumbers(value: any): boolean {
  if (!isArray(value) || !value.length)
    return false
  return value.every(i => isNumber(i))
}
