import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {Material, MaterialsQueryResponse, QuestionAnnotation, QuestionAnnotationRequest, Feedback} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const DOCUMENT_URL = `${API_URL}documents/`
const ANNOTATION_URL = `${API_URL}question-annotations/`
const FEEDBACK_URL = `${API_URL}feedback/`

const bulkAddAnnotation = (doc: QuestionAnnotationRequest): Promise<QuestionAnnotation | undefined> => {
  return axios
    .post(`${ANNOTATION_URL}create`, doc)
    .then((response: AxiosResponse<Response<QuestionAnnotation>>) => response.data)
    .then((response: Response<QuestionAnnotation>) => response.data)
}

const addFeedback = (doc: Feedback): Promise<Feedback | undefined> => {
  return axios
    .post(`${FEEDBACK_URL}create`, doc)
    .then((response: AxiosResponse<Response<Feedback>>) => response.data)
    .then((response: Response<Feedback>) => response.data)
}

const getDocuments = (): Promise<MaterialsQueryResponse> => {
  return axios
    .get(`${DOCUMENT_URL}`)
    .then((d: AxiosResponse<MaterialsQueryResponse>) => d.data)
}

const getDocumentsByID = (id: ID): Promise<Material | undefined> => {
  return axios
    .get(`${DOCUMENT_URL}/${id}`)
    .then((response: AxiosResponse<Response<Material>>) => response.data)
    .then((response: Response<Material>) => response.data)
}

const getAnnotationsByID = (id: ID): Promise<QuestionAnnotation | undefined> => {
  return axios
    .get(`${ANNOTATION_URL}/${id}`)
    .then((response: AxiosResponse<Response<QuestionAnnotation>>) => response.data)
    .then((response: Response<QuestionAnnotation>) => response.data)
}

const createDocument = (doc: Material): Promise<Material | undefined> => {
  return axios
    .post(`${DOCUMENT_URL}create`, doc)
    .then((response: AxiosResponse<Response<Material>>) => response.data)
    .then((response: Response<Material>) => response.data)
}

const editDocument = (doc: Material): Promise<Material | undefined> => {
  return axios
    .put(`${DOCUMENT_URL}${doc.id}`, doc)
    .then((response: AxiosResponse<Response<Material>>) => response.data)
    .then((response: Response<Material>) => response.data)
}

const deleteDocument = (id: ID): Promise<void> => {
  return axios.delete(`${DOCUMENT_URL}delete/${id}`).then(() => {})
}

// const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
//   const requests = userIds.map((id) => axios.delete(`${DOCUMENT_URL}/${id}`))
//   return axios.all(requests).then(() => {})
// }

export {bulkAddAnnotation, addFeedback, getDocuments, getDocumentsByID, getAnnotationsByID, createDocument, editDocument, deleteDocument}
