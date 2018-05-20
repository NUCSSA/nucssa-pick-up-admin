import React, { Component } from 'react'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import _ from 'lodash'
import { Jumbotron } from 'reactstrap'
import PropTypes from 'prop-types'
import DriverSubmission from 'src/components/driver/DriverSubmission'
import ErrorMessage from 'src/components/ErrorMessage'
import DriverSettingsButton from '../../components/driver/DriverSettingsButton'


@inject(stores => {
  const { driversStore } = stores
  const { driverList, getDriverList, redirectToSettings, error } = driversStore
  return {
    driverList,
    getDriverList,
    redirectToSettings,
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
    redirectToSettings: PropTypes.func,
    error: PropTypes.string,
  }

  componentWillMount() {
    const { getDriverList } = this.props
    getDriverList()
  }

  renderDriverList() {
    const { driverList, redirectToSettings } = this.props
    return _.map(driverList, (d) => {
      const redirectToSettingsAction = () => {
        redirectToSettings({ driverWechatId: d.wechatId })
      }
      return (
        <div key={d.wechatId}>
          <DriverSettingsButton redirectToSettings={redirectToSettingsAction}/>
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