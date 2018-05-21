import { axios } from 'src/api/axios'
import _ from 'lodash'

import { buildParamURI, buildAuthHeader } from 'src/util'

const ADMIN_URI = 'api/admin'
const ORDER_URI = ADMIN_URI + '/orders'
const PARAMS_DRIVER_WECHAT_ID = ':driverWechatId'
const PARAMS_STUDENT_WECHAT_ID = ':studentWechatId'
const DRIVER_ORDERS = ORDER_URI  +'/' + PARAMS_DRIVER_WECHAT_ID
const DELETE_ORDER = ORDER_URI + '/' + PARAMS_STUDENT_WECHAT_ID

const getDriverOrderList = function ( { driverWechatId }) {
  return buildParamURI({
    originalURI: DRIVER_ORDERS,
    paramName: PARAMS_DRIVER_WECHAT_ID,
    substitutedValue: driverWechatId,
  })
}

const deleteOrder = function( { studentWechatId}) {
  const driver_uri = buildParamURI({
    originalURI: DELETE_ORDER,
    paramName: PARAMS_STUDENT_WECHAT_ID,
    substitutedValue: studentWechatId,
  })
  return buildParamURI({
    originalURI: driver_uri,
    paramName: PARAMS_STUDENT_WECHAT_ID,
    substitutedValue: studentWechatId,
  })
}
export const getDriverOrder = async function({ driverWechatId }) {
  const uri = getDriverOrderList({driverWechatId})
  const headers = buildAuthHeader()
  return await axios.get(uri, { headers })
}

export const cancelOrder = async function({ studentWechatId}) {
  const uri = deleteOrder({ studentWechatId})
  const headers = buildAuthHeader()
  return await axios.delete(uri, { headers })
}