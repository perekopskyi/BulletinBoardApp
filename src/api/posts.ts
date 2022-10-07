import { submitToApi } from './axios.config'

export const getPosts = () => submitToApi({ url: '/posts' })

export const getPostsByUserId = (userId: string) =>
  submitToApi({ url: '/posts', params: { userId } })

export const getPost = (id: string) => submitToApi({ url: `/posts/${id}` })

export const createPost = (data: object) =>
  submitToApi({ method: 'post', url: `/posts`, data })

export const updatePost = (id: string, data: object) =>
  submitToApi({
    method: 'put',
    url: `/posts/${id}`,
    data,
  })

export const removePost = (id: string) =>
  submitToApi({
    method: 'delete',
    url: `/posts/${id}`,
  })
