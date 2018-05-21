import { observable, action } from 'mobx'
import {
  getDriverInfo,
  verifyDriver,
  postUpdateDriver,
} from 'src/api/driver'

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

  @observable loading = false
  @observable message = null
  @observable error = null


  setError(err) {
    self.error = err.message
    self.message = null
  }

  @action async getDriverInfo({ driverWechatId }) {
    self.error = null
    try {
      self.loading = true
      const res = await getDriverInfo({ driverWechatId })
      self.driverInfo = res.data
    } catch (err) {
      self.driverInfo = null
      if (err.response) {
        self.error = err.response.data.message
        self.message = null
      } else {
        self.setError()
      }
    }
    self.loading = false
  }

  @action async verifyDriver({ driverWechatId }) {
    try {
      await verifyDriver({ driverWechatId })
      self.driverInfo.verified = true
      self.message = 'success'
    } catch(err) {
      if (err.response) {
        self.error = err.response.data.message
        self.message = null
      } else {
        self.setError()
      }
    }
  }

  @action async updateDriverInfo(wechatId, form) {
    try {
      await postUpdateDriver(wechatId, form)
    } catch (err) {
      self.setError(err)
    }
  }

}

const self = new DriverStore()
export default self