import { observable, action } from 'mobx'
import {
  getAssignedList,
  getUnassignedList
} from 'src/api/order'

class OrderListStore {
  @observable assignedList = []
  @observable unassignedList = []
  @observable error = null

  @action async getAssignedList() {
    self.error = null
    try {
      const res = await getAssignedList()
      self.assignedList = res.data
    } catch (err) {
      self.assignedList = []
      if (err.response) {
        self.error = err.response.data.message
      } else {
        self.error = err.message
      }
    }
  }

  @action async getUnassignedList() {
    self.error = null
    try {
      const res = await getUnassignedList()
      self.unassignedList = res.data
    } catch (err) {
      self.unassignedList = []
      if (err.response) {
        self.error = err.response.data.message
      } else {
        self.error = err.message
      }
    }
  }
}

const self = new OrderListStore()
export default self