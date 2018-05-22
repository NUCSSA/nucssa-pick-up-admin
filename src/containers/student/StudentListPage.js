import React, { Component } from 'react'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import _ from 'lodash'
import { Jumbotron } from 'reactstrap'
import PropTypes from 'prop-types'
import AlertMessage from 'src/components/AlertMessage'
import StudentSubmission from 'src/components/student/StudentSubmission'


@inject(stores => {
  const { studentOrderStore } = stores
  const {
    assignedList,
    getAssignedList,
    unassignedList,
    getUnassignedList,
    redirectToSettings,
    assignedLoading,
    unassignedLoading,
    error,
  } = studentOrderStore
  return {
    assignedList,
    getAssignedList,
    unassignedList,
    getUnassignedList,
    redirectToSettings,
    assignedLoading,
    unassignedLoading,
    error,
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
    assignedLoading: PropTypes.bool,
    unassignedLoading: PropTypes.bool,
    error: PropTypes.string,
  }

  componentWillMount() {
    const { getAssignedList, getUnassignedList } = this.props
    getAssignedList()
    getUnassignedList()
  }

  renderAssignedList() {
    const { assignedList, assignedLoading } = this.props
    if (assignedLoading === true) {
      return <h3>Loading...</h3>
    }
    return _.map(assignedList, (o) => {
      return (
        <div key={o.studentWechatId}>
          <StudentSubmission studentSubmission={o.student}/>
          <br/>
        </div>
      )
    })
  }

  renderUnassignedList() {
    const { unassignedList, unassignedLoading } = this.props
    if (unassignedLoading === true) {
      return <h3>Loading...</h3>
    }
    return _.map(unassignedList, (s) => {
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
        <h1>被接单学生</h1>
        {this.renderAssignedList()}
        <h1>等单学生</h1>
        {this.renderUnassignedList()}
      </div>
    )
  }
}

export default StudentListPage