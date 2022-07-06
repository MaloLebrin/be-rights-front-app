import { createState } from '@malolebrin/pinia-entity-store'
import type { FileType } from './types'

export const baseCreationForm = {
  name: '',
  url: '',
  description: '',
}

export const fileState = defaultFileState()

export function defaultFileState() {
  return {
    ...createState<FileType>(),
    creationForm: baseCreationForm,
  }
}
