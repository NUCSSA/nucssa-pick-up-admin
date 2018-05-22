import { axios } from 'src/api/axios'
import _ from 'lodash'

import { buildParamURI, buildAuthHeader } from 'src/util'

const ADMIN_URI = 'api/admin'
const STUDENT_URI = ADMIN_URI + '/students'
// const PARAMS_DRIVER_WECHAT_ID = ':driverWechatId'
const PARAMS_STUDENT_WECHAT_ID = ':studentWechatId'
const ASSIGNED_ORDERS = STUDENT_URI +'/assignedList'
const UNASSIGNED_ORDERS = STUDENT_URI + '/unassignedList'

const STUDENT_SUBMISSION = STUDENT_URI + '/' + PARAMS_STUDENT_WECHAT_ID
const POST_UPDATE_STUDENT = STUDENT_URI + '/update/' + PARAMS_STUDENT_WECHAT_ID


export const getAssignedList = async function() {
  const headers = buildAuthHeader()
  return await axios.get(ASSIGNED_ORDERS, { headers })
}

export const getUnassignedList = async function() {
  const headers = buildAuthHeader()
  return await axios.get(UNASSIGNED_ORDERS, { headers })
}

const getStudentInfoURI = function( { studentWechatId }) {
  return buildParamURI({
    originalURI: STUDENT_SUBMISSION,
    paramName: PARAMS_STUDENT_WECHAT_ID,
    substitutedValue: studentWechatId,
  })
}

const postUpdateStudentInfoURI = function ( { studentWechatId }) {
  return buildParamURI({
    originalURI: POST_UPDATE_STUDENT,
    paramName: PARAMS_STUDENT_WECHAT_ID,
    substitutedValue: studentWechatId,
  })
}

export const getStudentInfo = async function({ studentWechatId }) {
  const uri = getStudentInfoURI({ studentWechatId })
  const headers = buildAuthHeader()
  return await axios.get(uri, { headers })
}

export const postUpdateStudent = async function(studentWechatId, form) {
  const uri = postUpdateStudentInfoURI({studentWechatId})
  const headers = buildAuthHeader()
  return await axios.post(uri, form, { headers })
}