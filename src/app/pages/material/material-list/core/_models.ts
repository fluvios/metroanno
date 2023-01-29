import {ID, Response} from '../../../../../_metronic/helpers'

export type Material = {
  id?: ID
  subject_id?: ID
  learning_outcome?: string
  text_document?: string
  min_number_of_annotators?: number
  current_number_of_annotators_assigned?: number
  min_number_of_questions_per_annotator?: number
  current_total_number_of_questions_annotated?: number
  done_number_of_annotators?: number
}

export type MaterialsQueryResponse = Response<Array<Material>>

export const initialMaterial: Material = {
  learning_outcome: '',
  text_document: ''
}
