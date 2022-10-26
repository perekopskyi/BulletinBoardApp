import { submitToApi } from './axios.config'

export const getUsers = () => submitToApi({ url: '/users' })

export const getUser = async (id: string) => {
  if (!id) {
    throw new Error('UserId is not defined')
  }

  return await submitToApi({ url: `/users/${id}` })
}

export const updateUser = (id: string, data: object) =>
  submitToApi({
    method: 'put',
    url: `/users/${id}`,
    data,
  })
