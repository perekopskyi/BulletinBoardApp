import { submitToApi } from './axios.config'

export const getUsers = () => submitToApi({ url: '/users' })

export const getUser = (id: string) => submitToApi({ url: `/users/${id}` })

export const updateUser = (id: string, data: object) =>
  submitToApi({
    method: 'put',
    url: `/users/${id}`,
    data,
  })
