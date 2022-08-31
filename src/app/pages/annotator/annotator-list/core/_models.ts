import {ID, Response} from '../../../../../_metronic/helpers'

export type QuestionAnnotation = {
  ID?: ID
  UserID?: ID
  DocumentID?: ID
  isLearningOutcomeShown?: boolean
  QuestionOrder?: number
  QuestionTypeID?: ID
  Keywords?: string
  QuestionText?: string
  AnswerText?: string
  TimeDuration?: number
  StatusApproval?: string
}

export type UsersQueryResponse = Response<Array<QuestionAnnotation>>

export const initialUser: QuestionAnnotation = {
  QuestionText: '',
  AnswerText: ''
}
