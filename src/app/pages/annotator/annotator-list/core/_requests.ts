import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {QuestionAnnotation, UsersQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_THEME_API_URL
const USER_URL = `${API_URL}/user`
const GET_USERS_URL = `${API_URL}/users/query`

const getUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios
    .get(`${GET_USERS_URL}?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getUserById = (id: ID): Promise<QuestionAnnotation | undefined> => {
  return axios
    .get(`${USER_URL}/${id}`)
    .then((response: AxiosResponse<Response<QuestionAnnotation>>) => response.data)
    .then((response: Response<QuestionAnnotation>) => response.data)
}

const createUser = (user: QuestionAnnotation): Promise<QuestionAnnotation | undefined> => {
  return axios
    .put(USER_URL, user)
    .then((response: AxiosResponse<Response<QuestionAnnotation>>) => response.data)
    .then((response: Response<QuestionAnnotation>) => response.data)
}

const updateUser = (user: QuestionAnnotation): Promise<QuestionAnnotation | undefined> => {
  return axios
    .post(`${USER_URL}/${user.ID}`, user)
    .then((response: AxiosResponse<Response<QuestionAnnotation>>) => response.data)
    .then((response: Response<QuestionAnnotation>) => response.data)
}

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${USER_URL}/${userId}`).then(() => {})
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getUsers, deleteUser, deleteSelectedUsers, getUserById, createUser, updateUser}
