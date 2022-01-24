import createEntity from "../utils/createEntity"
import createState from "../utils/createState"
import { BugReportStatus, BugReportType, BugReportTypeEnum } from "./types"

export const bugEntity = createEntity<BugReportType>('bug')

export const bugState = {
  ...createState<BugReportType>(bugEntity),
  creationForm: {
    name: '',
    type: BugReportTypeEnum.BUG,
    status: BugReportStatus.OPEN,
    url: '',
    description: '',
  },
}
