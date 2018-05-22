import { axios } from 'src/api/axios'
import _ from 'lodash'

import { buildParamURI, buildAuthHeader } from 'src/util'

const ADMIN_URI = 'api/admin'
const STUDENT_URI = ADMIN_URI + '/students'
// const PARAMS_DRIVER_WECHAT_ID = ':driverWechatId'
// const PARAMS_STUDENT_WECHAT_ID = ':studentWechatId'
const ASSIGNED_ORDERS = STUDENT_URI +'/assignedList'
const UNASSIGNED_ORDERS = STUDENT_URI + '/unassignedList'

export const getAssignedList = async function() {
  const headers = buildAuthHeader()
  return await axios.get(ASSIGNED_ORDERS, { headers })
}

export const getUnassignedList = async function() {
  const headers = buildAuthHeader()
  return await axios.get(UNASSIGNED_ORDERS, { headers })
}