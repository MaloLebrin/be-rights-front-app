import type { AnswerType } from './types'
import createState from '@/store/utils/createState'
import createEntity from '@/store/utils/createEntity'

const entity = createEntity<AnswerType>('answer')

export const answerState = createState<AnswerType>(entity)

export function defaultAnswerState() {
  return createState<AnswerType>(entity)
}
