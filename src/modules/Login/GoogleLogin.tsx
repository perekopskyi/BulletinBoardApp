import React, { useState } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { getConfig } from '../../config'
import { LOCAL_STORAGE } from '../../shared/constants'
import history from '../../shared/history'
import useGoogleAuthentication from '../Auth/useGoogleAuth'

export const GoogleLoginButton = () => {
  const { clientId } = getConfig()
  const { handleSuccess } = useGoogleAuthentication()

  const [loading, setLoading] = useState(false)

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
    } catch (error) {
      console.error(error)
    }
  }

  const onRequest = () => setLoading(true)

  if (loading) return <div>Loading</div>

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with google"
        onSuccess={response => onSuccess(response)}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
        isSignedIn={true}
        uxMode="redirect"
        onRequest={onRequest}
      />
    </div>
  )
}

export const GoogleLogoutButton = () => {
  const { clientId } = getConfig()

  const onSuccess = () => {
    console.log('🚀 ~> Logout')
    // TODO some alert
  }

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  )
}
