import createState from '@/store/utils/createState'
import createEntity from '@/store/utils/createEntity'
import { AnswerType } from './types'

const entity = createEntity<AnswerType>('answer')

export const answerState = createState<AnswerType>(entity)