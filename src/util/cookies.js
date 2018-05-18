import Cookies from 'universal-cookie'
import _ from 'lodash'

const cookies = new Cookies()

const AUTH_RESULT = 'auth_result'

export const getAuthResult = () => {
    return cookies.get(AUTH_RESULT)
}

export const setAuthResult = (authResult) => {
  if (_.isNil(authResult)) {
    removeAuthResult()
  } else {
    cookies.set(AUTH_RESULT, authResult)
  }
}

export const removeAuthResult = () => {
    cookies.remove(AUTH_RESULT)
}


