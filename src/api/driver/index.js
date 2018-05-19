import { axios } from 'src/api/axios'
import _ from 'lodash'

import { buildParamURI, buildAuthHeader } from 'src/util'

const ADMIN_URI = 'api/admin'
const DRIVER_LIST = ADMIN_URI + '/drivers'

export const getDriverList = async function() {
  const headers = buildAuthHeader()
  return await axios.get(DRIVER_LIST, { headers })
}