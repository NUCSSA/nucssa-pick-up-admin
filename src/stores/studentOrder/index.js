import { observable, action } from 'mobx'
import {
  getAssignedList,
  getUnassignedList,
} from 'src/api/student'

class StudentOrderStore {
  @observable assignedList = []
  @observable unassignedList = []
  @observable assignedLoading = true
  @observable unassignedLoading = true
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
    self.assignedLoading = false
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
    self.unassignedLoading = false
  }
}

const self = new StudentOrderStore()
export default self