import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../shared/useAuth'
import { ROUTES } from '../App/routes'

export const ProtectedRoute = ({ children }: any) => {
  const { token }: any = useAuth()
  const location = useLocation()

  if (!token)
    return (
      <Navigate to={`/${ROUTES.LOGIN}`} replace state={{ from: location }} />
    )

  return children
}
