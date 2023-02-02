import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {Material, MaterialsQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const DOCUMENT_URL = `${API_URL}documents/`

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

const createDocument = (doc: Material): Promise<Material | undefined> => {
  return axios
    .put(DOCUMENT_URL, doc)
    .then((response: AxiosResponse<Response<Material>>) => response.data)
    .then((response: Response<Material>) => response.data)
}

const editDocument = (doc: Material): Promise<Material | undefined> => {
  return axios
    .post(`${DOCUMENT_URL}/${doc.id}`, doc)
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

export {getDocuments, getDocumentsByID, createDocument, editDocument, deleteDocument}
