import { observable, action } from 'mobx'
import {
  getDriverInfo,
  verifyDriver,
  postUpdateDriver,
} from 'src/api/driver'
import _ from 'lodash'

const setError = function(err) {
  if (!_.isNil(err.response)) {
    self.error = err.response.data.message
  } else {
    self.error = err.message
  }
  self.message = null
}

class DriverStore {
  @observable driverInfo = {
    wechatId: '',
    name: '',
    gender: '',
    huskyEmail: '',
    email: '',
    status: '',
    degree: '',
    phone: '',
    carType: '',
    remark: '',
    verified: false,
  }
  @observable verifyLoading = false
  @observable loading = true
  @observable message = null
  @observable error = null

  @action async getDriverInfo({ driverWechatId }) {
    self.error = null
    self.loading = true
    try {
      const res = await getDriverInfo({ driverWechatId })
      const { data } = res
      if(_.isNil(data.error)) {
        self.driverInfo = data
      } else {
        self.driverInfo = null
        self.error = data.error
      }
    } catch (err) {
      self.driverInfo = null
      setError(err)
    }
    self.loading = false
  }

  @action async verifyDriver({ driverWechatId }) {
    self.verifyLoading = true
    try {
      self.message = null
      await verifyDriver({ driverWechatId })
      self.driverInfo.verified = true
      self.message = '验证成功'
    } catch(err) {
      setError(err)
    }
    self.verifyLoading = false
  }

  @action async updateDriverInfo(wechatId, form) {
    try {
      self.message = null
      await postUpdateDriver(wechatId, form)
      self.message = '司机信息已更新'
    } catch (err) {
      setError(err)
    }
  }

}

const self = new DriverStore()
export default self