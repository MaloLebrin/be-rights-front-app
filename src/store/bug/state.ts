import { createState } from '@malolebrin/pinia-entity-store'
import type { BugReportCreationFormType, BugReportType } from './types'
import { BugReportStatus, BugReportTypeEnum } from './types'

export const baseCreationForm: BugReportCreationFormType = {
  name: '',
  type: BugReportTypeEnum.BUG,
  status: BugReportStatus.OPEN,
  url: '',
  description: '',
}

export const bugState = defaultUserState()

export function defaultUserState() {
  return {
    ...createState<BugReportType>(),
    creationForm: baseCreationForm,
  }
}
