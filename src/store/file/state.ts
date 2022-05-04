import type { FileType } from './types'
import createState from '@/store/utils/createState'
import createEntity from '@/store/utils/createEntity'

const entity = createEntity<FileType>('file')

export const baseCreationForm = {
  name: '',
  url: '',
  description: '',
}

export const fileState = defaultFileState()

export function defaultFileState() {
  return {
    ...createState<FileType>(entity),
    creationForm: baseCreationForm,
  }
}
