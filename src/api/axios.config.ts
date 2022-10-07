import axios from 'axios'
import { LOCAL_STORAGE } from '../shared/constants'

// the same as on BE
interface LoginStatus {
  username: string
  expiresIn: string
  accessToken: string
}

export const getAuthDataFromLS = () => {
  const objFromStorage = localStorage.getItem(LOCAL_STORAGE.loggedIn)
  if (!objFromStorage) return null
  const loggedIn: LoginStatus = JSON.parse(objFromStorage)
  return loggedIn
}

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: 'Bearer ' + getAuthDataFromLS()?.accessToken,
  },
})

export const submitToApi = async ({
  method = 'get',
  url,
  data,
  params,
}: any) => {
  try {
    const response = await Axios({ method, url, data, params })
    return response.data
  } catch (error: any) {
    const message = error?.response.data.message || error?.message
    throw new Error(message).message
  }
}
