import { observable, action } from 'mobx'
import { getDriverList, verifyDriver } from 'src/api/driver'
import { buildParamURI } from 'src/util'
import routing from '../routing'
import { DRIVER_SETTINGS, PARAMS_DRIVER_WECHAT_ID } from 'src/data/route'

class DriverListStore {
  @observable driverList = []
  @observable error = null

  @action async getDriverList() {
    self.error = null
    try {
      const res = await getDriverList()
      self.driverList = res.data
    } catch (err) {
      self.driverList = []
      if (err.response) {
        self.error = err.response.data.message
      } else {
        self.error = err.message
      }
    }
  }

  @action redirectToSettings({ driverWechatId }) {
    let redirectedURI = buildParamURI({
      originalURI: DRIVER_SETTINGS,
      paramName: PARAMS_DRIVER_WECHAT_ID,
      substitutedValue: driverWechatId,
    })
    routing.history.push(redirectedURI)
  }
}

const self = new DriverListStore()
export default self