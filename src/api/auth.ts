import { LOCAL_STORAGE } from '../shared/constants'
import { submitToApi } from './axios.config'

export type LoginBody = { username: string; password: string }

export const logout = async (data: any) => {
  try {
    await submitToApi({
      method: 'post',
      url: '/auth/logout',
      data,
    })
  } catch (error: any) {
    console.error(error)
    throw new Error(error)
  }
}

export const login = async (data: LoginBody) => {
  try {
    const response = await submitToApi({
      method: 'post',
      url: '/auth/login',
      data,
    })
    localStorage.setItem(
      LOCAL_STORAGE.loggedIn,
      JSON.stringify({ user: response })
    )
    return response
  } catch (error: any) {
    console.error(error)
    throw new Error(error)
  }
}

export type RegistrationBody = {
  username: string
  password: string
  email: string
}

export const register = (body: RegistrationBody) =>
  submitToApi({
    method: 'post',
    url: '/auth/signup',
    data: {
      ...body,
      createdBy: '',
      updatedBy: '',
    },
  })
