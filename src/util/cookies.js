import Cookies from 'universal-cookie'
import _ from 'lodash'

const cookies = new Cookies()

const AUTH_RESULT = 'auth_result'

const ACCESS_TOKEN = 'access_token'

const EXPIRES_AT = 'expires_at'

export const getAuthResult = () => {
  return cookies.get(AUTH_RESULT)
}

export const getAccessToken = () => {
  return cookies.get(ACCESS_TOKEN)
}

export const getExpiresAt = () => {
  return cookies.get(EXPIRES_AT)
}

export const setAuthResult = (authResult) => {
  if (_.isNil(authResult)) {
    removeAuthResult()
  } else {
    const expiresAt = (authResult.expiresIn * 1000)
        + new Date().getTime()
    cookies.set(AUTH_RESULT, authResult)
    cookies.set(ACCESS_TOKEN, authResult.accessToken)
    cookies.set(EXPIRES_AT, expiresAt)
  }
}

export const removeAuthResult = () => {
  cookies.remove(AUTH_RESULT)
  cookies.remove(ACCESS_TOKEN)
  cookies.remove(EXPIRES_AT)
}


