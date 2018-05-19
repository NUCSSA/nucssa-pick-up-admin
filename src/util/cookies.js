import Cookies from 'universal-cookie'
import _ from 'lodash'

const cookies = new Cookies()

const AUTH_RESULT = 'auth_result'

const ACCESS_TOKEN = 'access_token'

export const getAuthResult = () => {
  return cookies.get(AUTH_RESULT)
}

export const getAccessToken = () => {
  return cookies.get(ACCESS_TOKEN)
}

export const setAuthResult = (authResult) => {
  if (_.isNil(authResult)) {
    removeAuthResult()
  } else {
    cookies.set(AUTH_RESULT, authResult)
    cookies.set(ACCESS_TOKEN, authResult.accessToken)
  }
}

export const removeAuthResult = () => {
  cookies.remove(AUTH_RESULT)
  cookies.remove(ACCESS_TOKEN)
}


