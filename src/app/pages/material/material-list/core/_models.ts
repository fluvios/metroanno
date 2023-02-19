import {ID, Response} from '../../../../../_metronic/helpers'

export type Material = {
  id?: ID
  subject_id?: ID
  learning_outcome?: string
  text_document?: string
  min_number_of_questions?: number
  min_number_of_annotators?: number
  current_number_of_annotators_assigned?: number
  min_number_of_questions_per_annotator?: number
  current_total_number_of_questions_annotated?: number
  done_number_of_annotators?: number
}

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
export type MaterialsQueryResponse = Response<Array<Material>>

export const initialFeedback: Feedback = {
  feedback_text: ''
}

export const initialQuestion: QuestionAnnotation = {
  keywords: '',
  question_text: '',
  answer_text: ''
}

export const initialMaterial = {
  subject_id: 0,
  learning_outcome: '',
  text_document: '',
  min_number_of_questions: 0
}
