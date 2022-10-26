import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login'
import { Axios } from '../../api/axios.config'
import { ENDPOINT } from '../../api/endpoints'

function useGoogleAuthentication() {
  const handleSuccess = async (
    googleResponse: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ('accessToken' in googleResponse) {
      const accessToken = googleResponse.accessToken

      try {
        const { data } = await Axios.post(
          `${process.env.REACT_APP_API_URL}${ENDPOINT.GOOGLE}`,
          {
            token: accessToken,
            headers: { 'Content-Type': 'application/json' },
          }
        )
        return data
      } catch (error: any) {
        console.error('useGoogleAuthentication handleSuccess:', error)
        throw new Error(error)
      }
    }
  }

  return {
    handleSuccess,
  }
}

export default useGoogleAuthentication
