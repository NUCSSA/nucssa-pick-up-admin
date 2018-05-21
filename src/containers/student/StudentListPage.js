import React, { Component } from 'react'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import _ from 'lodash'
import { Jumbotron } from 'reactstrap'
import PropTypes from 'prop-types'
import AlertMessage from 'src/components/AlertMessage'
import StudentSubmission from 'src/components/student/StudentSubmission'


@inject(stores => {
  const { orderListStore } = stores
  return {
    assignedList: orderListStore.assignedList,
    getAssignedList: orderListStore.getAssignedList,
    unassignedList: orderListStore.unassignedList,
    getUnassignedList: orderListStore.getUnassignedList,
    redirectToSettings: orderListStore.redirectToSettings,
    error: orderListStore.error,
  }
})
@observer
class StudentListPage extends Component {
  constructor(props) {
    super(props)
    this.renderError = this.renderError.bind(this)

  }

  static propTypes = {
    assignedList: MobxPropTypes.observableArray,
    getAssignedList: PropTypes.func,
    unassignedList: MobxPropTypes.observableArray,
    getUnassignedList: PropTypes.func,
    redirectToSettings: PropTypes.func,
    error: PropTypes.string,
  }

  componentWillMount() {
    const { getAssignedList, getUnassignedList } = this.props
    getAssignedList()
    getUnassignedList()
  }

  renderAssignedList() {
    const { assignedList } = this.props
    return _.map(assignedList, (o) => {
      console.log(o)
      return (
        <div key={o.studentWechatId}>
          <StudentSubmission studentSubmission={o.student}/>
          <br/>
        </div>
      )
    })
  }

  renderUnassignedList() {
    const { unassignedList } = this.props
    return _.map(unassignedList, (s) => {
      console.log(s)
      return (
        <div key={s.wechatId}>
          <StudentSubmission studentSubmission={s}/>
          <br/>
        </div>
      )
    })
  }

  renderError() {
    if (!_.isNil(this.props.error)) {
      return (
        <AlertMessage bsStyle='danger' message={this.props.error}/>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderError()}
        <Jumbotron>
          <h3 className='display-6'>乘客列表</h3>
        </Jumbotron>
        <h1>Assigned</h1>
        {this.renderAssignedList()}
        <h1>Unassigned</h1>
        {this.renderUnassignedList()}
      </div>
    )
  }
}

export default StudentListPage