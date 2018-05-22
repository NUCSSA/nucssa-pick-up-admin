import { observable, action } from 'mobx'
import {
  getAssignedList,
  getUnassignedList,
} from 'src/api/student'
import { buildParamURI } from 'src/util'
import { STUDENT_SETTINGS, PARAMS_STUDENT_WECHAT_ID } from 'src/data/route'
import routing from '../routing'

class studentListStore {
  @observable assignedList = []
  @observable unassignedList = []
  @observable assignedLoading = true
  @observable unassignedLoading = true
  @observable error = null

  @action async getAssignedList() {
    self.error = null
    try {
      const res = await getAssignedList()
      self.assignedList = res.data
    } catch (err) {
      self.assignedList = []
      if (err.response) {
        self.error = err.response.data.message
      } else {
        self.error = err.message
      }
    }
    self.assignedLoading = false
  }

  @action async getUnassignedList() {
    self.error = null
    try {
      const res = await getUnassignedList()
      self.unassignedList = res.data
    } catch (err) {
      self.unassignedList = []
      if (err.response) {
        self.error = err.response.data.message
      } else {
        self.error = err.message
      }
    }
    self.unassignedLoading = false
  }

  @action redirectToSettings({ studentWechatId }) {
    let redirectedURI = buildParamURI({
      originalURI: STUDENT_SETTINGS,
      paramName: PARAMS_STUDENT_WECHAT_ID,
      substitutedValue: studentWechatId,
    })
    routing.history.push(redirectedURI)
  }
}

const self = new studentListStore()
export default self