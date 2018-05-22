import { observable, action } from 'mobx'
import {
  getStudentInfo,
  postUpdateStudent,
} from 'src/api/student'
import _ from 'lodash'

class StudentStore {
  @observable studentInfo = {
    wechatId: '',
    studentSet: [],
    arrivingTime: '',
    flightNumber: '',
    address: '',
    luggageNumber: '',
    remark: '',
  }

  // @observable studentInfo = null

  @observable loading = false
  @observable message = null
  @observable error = null


  setError(err) {
    self.error = err.message
    self.message = null
  }

  @action async getStudentInfo({ studentWechatId }) {
    self.error = null
    try {
      self.loading = true
      const res = await getStudentInfo({ studentWechatId })
      const { data } = res
      if (_.isNil(data.error)) {
        self.studentInfo = data
      } else {
        self.studentInfo = null
        self.error = data.error
      }
    } catch (err) {
      self.studentInfo = null
      if (err.response) {
        self.error = err.response.data.message
        self.message = null
      } else {
        self.setError()
      }
    }
    self.loading = false
  }


  @action async updateStudentInfo(wechatId, form) {
    try {
      await postUpdateStudent(wechatId, form)
    } catch (err) {
      self.setError(err)
    }
  }

}

const self = new StudentStore()
export default self