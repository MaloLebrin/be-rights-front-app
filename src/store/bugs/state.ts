import createEntity from "../utils/createEntity";
import createState from "../utils/createState";
import { BugReportType } from "./types";

export const bugEntity = createEntity<BugReportType>('bug')

export const bugState = createState<BugReportType>(bugEntity)
