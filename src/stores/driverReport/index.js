import { observable, action } from 'mobx'
import { getDriverReport } from 'src/api/order'

class DriverReportStore {
  @observable driverReportList = []
  @observable error = null
  @observable loading = false

  @action async getDriverReport() {
    self.error = null
    self.loading = true
    try {
      const res = await getDriverReport()
      self.driverReportList = res.data
    } catch (err) {
      self.driverReportList = []
      if (err.response) {
        self.error = err.response.data.message
      } else {
        self.error = err.message
      }
    }
    self.loading = false
  }
}

const self = new DriverReportStore()
export default self