import createEntity from "../utils/createEntity"
import createState from "../utils/createState"
import { BugReportStatus, BugReportType, BugReportTypeEnum, BugReportCreationFormType } from "./types"

export const bugEntity = createEntity<BugReportType>('bug')

export const baseCreationForm: BugReportCreationFormType = {
  name: '',
  type: BugReportTypeEnum.BUG,
  status: BugReportStatus.OPEN,
  url: '',
  description: '',
}

export const bugState = {
  ...createState<BugReportType>(bugEntity),
  creationForm: baseCreationForm,
}
