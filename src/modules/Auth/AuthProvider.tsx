import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { login, LoginBody, logout } from '../../api/auth'
import { LOCAL_STORAGE } from '../../shared/constants'
import { ROUTES } from '../App/routes'
import { getAuthDataFromLS } from '../../api/axios.config'

export const AuthContext = React.createContext(null)

type AuthProviderValue = {
  isLoginLoading: boolean
  authError: any
  loggedIn: object
  onLogin: Function
  onLogout: Function
}

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate()
  const location: any = useLocation()

  const loggedIn = getAuthDataFromLS()

  const { error, isLoading, mutateAsync } = useMutation((values: LoginBody) =>
    login(values)
  )
  const {
    error: logoutError,
    isLoading: logoutIsLoading,
    mutateAsync: logoutMutation,
  } = useMutation(logout)

  const handleLogin = async (values: LoginBody) => {
    const data = await mutateAsync(values)

    if (data) {
      localStorage.setItem(
        LOCAL_STORAGE.loggedIn,
        JSON.stringify({ user: data })
      )

      const origin = location.state?.from?.pathname || '/'
      navigate(origin)
    }
  }

  const handleLogout = async () => {
    const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE.loggedIn)).user

    await logoutMutation(user)
    localStorage.removeItem(LOCAL_STORAGE.loggedIn)
    navigate(ROUTES.LOGIN)
  }

  const value: AuthProviderValue = {
    isLoginLoading: isLoading,
    authError: error,
    loggedIn,
    onLogin: handleLogin,
    onLogout: handleLogout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
