import {ID, Response} from '../../../../../_metronic/helpers'

export type Material = {
  ID?: ID
  SubjectID?: ID
  LearningOutcome?: string
  TextDocument?: string
  MinNumberOfAnnotators?: number
  CurrentNumberOfAnnotatorsAssigned?: number
  MinNumberOfQuestionsPerAnnotator?: number
  CurrentTotalNumberOfQuestionsAnnotated?: number
}

export type MaterialsQueryResponse = Response<Array<Material>>

export const initialMaterial: Material = {
  LearningOutcome: '',
  TextDocument: ''
}
