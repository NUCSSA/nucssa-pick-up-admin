import { observable, action } from 'mobx'
import { getDriverList } from 'src/api/driver'

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
      self.error = err.message
      console.log(err)
    }
  }
}

const self = new DriverListStore()
export default self