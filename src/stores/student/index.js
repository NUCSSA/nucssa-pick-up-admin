import { observable, action } from 'mobx'
import {
  getStudentInfo,
  postUpdateStudent,
} from 'src/api/student'
import _ from 'lodash'

const setError = function(err) {
  if (!_.isNil(err.response)) {
    self.error = err.response.data.message
  } else {
    self.error = err.message
    self.message = null
  }
}

class StudentStore {
  @observable studentInfo = null

  // @observable studentInfo = null

  @observable loading = false
  @observable message = null
  @observable error = null



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
      setError(err)
    }
    self.loading = false
  }


  @action async updateStudentInfo(wechatId, form) {
    self.message = null
    try {
      await postUpdateStudent(wechatId, form)
    } catch (err) {
      setError(err)
    }
    self.message = '学生信息更新成功'
  }

}

const self = new StudentStore()
export default self