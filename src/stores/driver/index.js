import { observable, action } from 'mobx'
import { getDriverInfo, verifyDriver } from 'src/api/driver'

class DriverStore {
  @observable isVerified = false
  @observable driverInfo = null
  @observable loading = false
  // @observable wechatId = null
  // @observable name = null
  // @observable gender = null
  // @observable huskyEmail = null
  // @observable email = null
  @observable error = null
  //   let {
  //     wechatId,
  //     name,
  //     gender,
  //     huskyEmail,
  //     email,
  //     status,
  //     degree,
  //     phone,
  //     carType,
  //     remark,
  //     verified,
  //   } = this.props.driverSubmission
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
      } else {
        self.error = err.message
      }
    }
    self.loading = false
  }


  @action async verifyDriver({ driverWechatId }) {
    try {
      await verifyDriver({ driverWechatId })
      this.isVerified = true
    } catch(err) {
      if (err.response) {
        self.error = err.response.data.message
      } else {
        self.error = err.message
      }
    }
  }
}

const self = new DriverStore()
export default self