import type { FileType } from './types'
import createState from '@/store/utils/createState'
import createEntity from '@/store/utils/createEntity'

const entity = createEntity<FileType>('file')

export const fileState = createState<FileType>(entity)

export function defaultFileState() {
  return createState<FileType>(entity)
}
