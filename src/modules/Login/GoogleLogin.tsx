import { Alert } from 'antd'
import React, { useState } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { Loader } from '../../components/Loader'
import { LOCAL_STORAGE } from '../../shared/constants'
import history from '../../shared/history'
import useGoogleAuthentication from '../Auth/useGoogleAuth'

const CLIENT_ID = process.env.REACT_APP_GOOGLE_AUTH0_CLIENT_ID

export const GoogleLoginButton = () => {
  const { handleSuccess } = useGoogleAuthentication()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onFailure = (res: any) => {
    console.log('GoogleLoginButton onFailure', res)
  }

  const onSuccess = async (response: any) => {
    try {
      const data = await handleSuccess(response)
      console.log('GoogleLoginButton ~> onSuccess', { data })
      localStorage.setItem(
        LOCAL_STORAGE.loggedIn,
        JSON.stringify({ user: data.user })
      )

      history.push('/')
    } catch (errorMessage) {
      setError(errorMessage)
    }
  }

  const onRequest = () => setLoading(true)

  if (loading) return <Loader />

  return (
    <div className="flex flex-col items-center">
      <GoogleLogin
        className="mb-4 w-40"
        clientId={CLIENT_ID}
        buttonText="Login with google"
        onSuccess={response => onSuccess(response)}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
        isSignedIn={true}
        uxMode="redirect"
        onRequest={onRequest}
      />
      {error ? <Alert message={`${error}`} type="error" /> : null}
    </div>
  )
}

export const GoogleLogoutButton = () => {
  const onSuccess = () => {
    console.log('🚀 ~> Logout')
    // TODO some alert
  }

  return (
    <div>
      <GoogleLogout
        clientId={CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  )
}
