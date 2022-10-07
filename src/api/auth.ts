import { LOCAL_STORAGE } from '../shared/constants'
import { submitToApi } from './axios.config'

export type LoginBody = { username: string; password: string }

export const login = async (data: LoginBody) => {
  try {
    const response = await submitToApi({
      method: 'post',
      url: '/auth/login',
      data,
    })
    localStorage.setItem(LOCAL_STORAGE.loggedIn, JSON.stringify(response))
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

// TODO
export const loginOauth = async () => {
  try {
    const response = await submitToApi({
      url: '/auth/oauth2',
    })
    console.log('🚀 ~> loginOauth', response)
    return response
  } catch (error: any) {
    console.error('loginOauth', error)
    throw new Error(error)
  }
}
