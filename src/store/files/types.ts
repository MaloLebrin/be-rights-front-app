import { BaseEntity } from "~/types/globals"
import { State } from "~/store/utils/types"

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
	format: string
	url: string
	secure_url: string
	original_filename: string
	event: number
	employee: number
	user: number
}

export enum FileTypeEnum {
	MODEL = 'MODEL',
	IMAGE_RIGHT = 'IMAGE_RIGHT',
}

export interface FileState extends State<FileType> { }
