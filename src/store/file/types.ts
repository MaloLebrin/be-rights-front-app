import type { BaseEntity } from '@/types/globals'
import type { State } from '@/store/utils/types'

export interface FileType extends BaseEntity {
  name: string
  fileName: string
  mimeType: string
  size: number
  type: FileTypeEnum
  description: string | null
  public_id: string
  signature: string
  width: number
  height: number
  format: FileFormatEnum
  url: string
  secure_url: string
  original_filename: string
  event: number
  employee: number
  createdByUser: number
}

export type FileFormType = Pick<FileType, 'name' | 'url' | 'description'>

export enum FileTypeEnum {
  MODEL = 'MODEL',
  IMAGE_RIGHT = 'IMAGE_RIGHT',
  LOGO = 'LOGO',
  BUG_REPORT = 'BUG_REPORT',
  PROFILE_PICTURE = 'PROFILE_PICTURE',
}

export const fileTypeArray = Object.values(FileTypeEnum)

export enum FileFormatEnum {
  PDF = 'pdf',
  PNG = 'png',
}

export interface FileState extends State<FileType> {
  creationForm: FileFormType
}
