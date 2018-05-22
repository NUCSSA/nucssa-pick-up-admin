import { axios } from 'src/api/axios'
import _ from 'lodash'

import { buildParamURI, buildAuthHeader } from 'src/util'

const ADMIN_URI = 'api/admin'
const ORDER_URI = ADMIN_URI + '/orders'
const PARAMS_DRIVER_WECHAT_ID = ':driverWechatId'
const PARAMS_STUDENT_WECHAT_ID = ':studentWechatId'

const DRIVER_ORDERS = ORDER_URI  +'/driver/' + PARAMS_DRIVER_WECHAT_ID
const DELETE_STUDENT_ORDER = ORDER_URI + '/student/' + PARAMS_STUDENT_WECHAT_ID
const DELETE_DRIVER_ORDER = ORDER_URI + '/driver/' + PARAMS_STUDENT_WECHAT_ID

const STUDENT_ORDER = ORDER_URI + '/student/' + PARAMS_STUDENT_WECHAT_ID

const getDriverOrderList = function ( { driverWechatId }) {
  return buildParamURI({
    originalURI: DRIVER_ORDERS,
    paramName: PARAMS_DRIVER_WECHAT_ID,
    substitutedValue: driverWechatId,
  })
}

const getStudentOrderInfo = function ( { studentWechatId }) {
  return buildParamURI({
    originalURI: STUDENT_ORDER,
    paramName: PARAMS_STUDENT_WECHAT_ID,
    substitutedValue: studentWechatId,
  })
}

const deleteStudentOrder = function( { studentWechatId} ) {
  return buildParamURI({
    originalURI: DELETE_STUDENT_ORDER,
    paramName: PARAMS_STUDENT_WECHAT_ID,
    substitutedValue: studentWechatId,
  })
}

const deleteDriverOrder = function( { studentWechatId} ) {
  return buildParamURI({
    originalURI: DELETE_DRIVER_ORDER,
    paramName: PARAMS_STUDENT_WECHAT_ID,
    substitutedValue: studentWechatId,
  })
}

export const getDriverOrder = async function({ driverWechatId }) {
  const uri = getDriverOrderList({driverWechatId})
  const headers = buildAuthHeader()
  return await axios.get(uri, { headers })
}

export const getStudentOrder = async function({ studentWechatId }) {
  const uri = getStudentOrderInfo({ studentWechatId })
  const headers = buildAuthHeader()
  return await axios.get(uri, { headers })
}

export const cancelStudentOrder = async function({ studentWechatId}) {
  const uri = deleteStudentOrder({ studentWechatId})
  const headers = buildAuthHeader()
  return await axios.delete(uri, { headers })
}

export const cancelDriverOrder = async function({ studentWechatId }) {
  const uri = deleteDriverOrder({ studentWechatId})
  const headers = buildAuthHeader()
  return await axios.delete(uri, { headers })
}