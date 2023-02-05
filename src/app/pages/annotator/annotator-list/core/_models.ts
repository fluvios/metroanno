import {ID, Response} from '../../../../../_metronic/helpers'

export type Feedback = {
  document_id?: ID
  feedback_text?: string
}

export type QuestionAnnotation = {
  question_type_id?: ID
  keywords?: string
  question_text?: string
  answer_text?: string
}

export type QuestionAnnotationRequest = {
  document_id?: ID
  is_learning_outcome_shown: boolean
  time_duration: number
  question_annotations: Array<QuestionAnnotation>
}

export type UsersQueryResponse = Response<Array<QuestionAnnotation>>
export type QuestionAnnotationResponse = Response<Array<QuestionAnnotation>>

export const initialFeedback: Feedback = {
  feedback_text: ''
}

export const initialQuestion: QuestionAnnotation = {
  keywords: '',
  question_text: '',
  answer_text: ''
}
