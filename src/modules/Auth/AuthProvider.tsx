import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { login, LoginBody } from '../../api/auth'
import { LOCAL_STORAGE } from '../../shared/constants'
import { ROUTES } from '../App/routes'
import { getAuthDataFromLS } from '../../api/axios.config'

export const AuthContext = React.createContext(null)

type AuthProviderValue = {
  token: string | null
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
  const [token, setToken] = React.useState(loggedIn?.accessToken || null)

  const { error, isLoading, mutateAsync } = useMutation((values: LoginBody) =>
    login(values)
  )

  const handleLogin = async (values: LoginBody) => {
    const data = await mutateAsync(values)

    if (data) {
      setToken(data.accessToken)
      localStorage.setItem(LOCAL_STORAGE.loggedIn, JSON.stringify(data))

      const origin = location.state?.from?.pathname || '/'
      navigate(origin)
    }
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem(LOCAL_STORAGE.loggedIn)
    navigate(ROUTES.LOGIN)
  }

  const value: AuthProviderValue = {
    token,
    isLoginLoading: isLoading,
    authError: error,
    loggedIn,
    onLogin: handleLogin,
    onLogout: handleLogout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
