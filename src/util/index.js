import _ from 'lodash'

export const buildParamURI = function({ originalURI, paramName, substitutedValue  }) {
  return _.replace(originalURI, paramName, substitutedValue)
}

export const buildAuthHeader = function(token) {
  return {'Authorization': 'Bearer ' + token}
}