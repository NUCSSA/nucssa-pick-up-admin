import { observable, action } from 'mobx'
import {
  cancelDriverOrder,
  getStudentOrder,
} from 'src/api/order'

class StudentOrderStore {
  @observable studentOrder = null
  @observable studentWechatId = ''
  @observable message = null
  @observable loadingOrder = true
  @observable error = null


  setError(err) {
    self.error = err.message
    self.message = null
  }

  @action async cancelDriverOrder({ studentWechatId }) {
    self.error = null
    try {
      await cancelDriverOrder({ studentWechatId })
      try {
        await self.getStudentOrder({studentWechatId: self.studentWechatId})
      } catch(err) {
        self.driverOrders = []
        self.error = err.message
      }
    } catch (err) {
      self.driverOrders = []
      self.error = err.message
    }
  }

  @action async getStudentOrder({ studentWechatId }) {
    self.error = null
    self.studentWechatId = studentWechatId
    try {
      let res = await getStudentOrder({ studentWechatId })
      self.studentOrder = res.data
    } catch (err) {
      self.driverOrders = []
      self.error = err.message
    }
    self.loadingOrder = false
  }


}

const self = new StudentOrderStore()
export default self