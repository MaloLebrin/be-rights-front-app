import createState from '~/store/utils/createState'
import createEntity from '~/store/utils/createEntity'
import { FileType } from './types'

const entity = createEntity<FileType>('file')

export const fileState = createState<FileType>(entity)