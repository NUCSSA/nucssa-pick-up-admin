import _ from 'lodash'
import { getAccessToken } from 'src/util/cookies'

export const buildParamURI = function({ originalURI, paramName, substitutedValue  }) {
  return _.replace(originalURI, paramName, substitutedValue)
}

export const buildAuthHeader = function() {
  const token = getAccessToken()
  return {'Authorization': 'Bearer ' + token}
}