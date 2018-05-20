import React, { Component } from 'react'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import _ from 'lodash'
import { Jumbotron } from 'reactstrap'
import PropTypes from 'prop-types'
import DriverSubmission from 'src/components/driver/DriverSubmission'
import ErrorMessage from 'src/components/ErrorMessage'


@inject(stores => {
  const { driverListStore } = stores
  const { driverList, getDriverList, error } = driverListStore
  return {
    driverList,
    getDriverList,
    error,
  }
})
@observer
class DriverListPage extends Component {
  constructor(props) {
    super(props)
    this.renderError = this.renderError.bind(this)
  }

  static propTypes = {
    driverList: MobxPropTypes.observableArray,
    getDriverList: PropTypes.func,
    error: PropTypes.string,
  }

  componentWillMount() {
    let { getDriverList } = this.props
    getDriverList()
  }

  renderDriverList() {
    const { driverList } = this.props
    return _.map(driverList, (d) => {
      return (
        <div key={d.wechatId}>
          <DriverSubmission driverSubmission={d}/>
        </div>
      )
    })
  }

  renderError() {
    if (!_.isNil(this.props.error)) {
      return (
        <ErrorMessage message={this.props.error}/>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderError()}
        <Jumbotron>
          <h3 className='display-6'>司机列表</h3>
        </Jumbotron>
        {this.renderDriverList()}
      </div>
    )
  }
}

export default DriverListPage