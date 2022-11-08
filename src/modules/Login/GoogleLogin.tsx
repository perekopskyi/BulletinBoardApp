import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { Alert } from 'antd'
import { Loader } from '../../components/Loader'
import { CLIENT_ID, LOCAL_STORAGE } from '../../shared/constants'
import useGoogleAuthentication from '../Auth/useGoogleAuth'

export const GoogleLoginButton = () => {
  const { handleSuccess } = useGoogleAuthentication()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onSuccess = async (response: any) => {
    try {
      const { user } = await handleSuccess(response)
      localStorage.setItem(LOCAL_STORAGE.loggedIn, JSON.stringify({ user }))
      navigate('/')
    } catch (errorMessage) {
      setError(errorMessage)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="flex flex-col items-center">
      <GoogleLogin
        className="mb-4 w-40"
        clientId={CLIENT_ID}
        buttonText="Login with google"
        onSuccess={response => onSuccess(response)}
        onFailure={(error: any) =>
          console.log('GoogleLoginButton onFailure', error)
        }
        cookiePolicy="single_host_origin"
        isSignedIn={true}
        uxMode="redirect"
        onRequest={() => setLoading(true)}
      />
      {error ? <Alert message={`${error}`} type="error" /> : null}
    </div>
  )
}
