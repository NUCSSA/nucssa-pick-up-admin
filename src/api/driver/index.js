import { axios } from 'src/api/axios'
import _ from 'lodash'

import { buildParamURI, buildAuthHeader } from 'src/util'

const ADMIN_URI = 'api/admin'

const DRIVERS_URI = ADMIN_URI + '/drivers'

const DRIVER_URI = ADMIN_URI + '/driver'
const PARAMS_DRIVER_WECHAT_ID = ':driverWechatId'
const DRIVER_INFO = DRIVER_URI  +'/' + PARAMS_DRIVER_WECHAT_ID
const VERIFY_DRIVER =  ADMIN_URI + '/verify/' + PARAMS_DRIVER_WECHAT_ID

const postVerifyDriver = function({ driverWechatId }) {
  return buildParamURI({
    originalURI: VERIFY_DRIVER,
    paramName: PARAMS_DRIVER_WECHAT_ID,
    substitutedValue: driverWechatId,
  })
}

const getDriverInformation = function( {driverWechatId }) {
  return buildParamURI({
    originalURI: DRIVER_INFO,
    paramName: PARAMS_DRIVER_WECHAT_ID,
    substitutedValue: driverWechatId,
  })
}

export const getDriverList = async function() {
  const headers = buildAuthHeader()
  return await axios.get(DRIVERS_URI, { headers })
}

export const verifyDriver = async function({ driverWechatId }) {
  const uri = postVerifyDriver({driverWechatId})
  const headers = buildAuthHeader()
  return await axios.post(uri, null, { headers })
}

export const getDriverInfo = async function({ driverWechatId }) {
  const uri = getDriverInformation({ driverWechatId })
  const headers = buildAuthHeader()
  return await axios.get(uri, { headers })
}