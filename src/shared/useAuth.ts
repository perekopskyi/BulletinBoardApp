import React from 'react'
import { AuthContext } from '../modules/Auth/AuthProvider'

export const useAuth = () => React.useContext(AuthContext)
