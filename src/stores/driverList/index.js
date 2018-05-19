import { observable, action } from 'mobx'
import { getDriverList } from 'src/api/driver'
import { getAccessToken } from 'src/util/cookies'

class DriverListStore {
  @observable driverList = []
  @observable error = null

  @action async getDriverList() {
    self.error = null
    try {
      const accessToken = getAccessToken()
      const res = await getDriverList(accessToken)
      self.driverList = res.data
    } catch (err) {
      self.driverList = []
      self.error = err.message
      console.log(err)
    }
  }
}

const self = new DriverListStore()
export default self