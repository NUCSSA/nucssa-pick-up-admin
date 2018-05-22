import React, { Component } from 'react'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import _ from 'lodash'
import { Jumbotron } from 'reactstrap'
import PropTypes from 'prop-types'
import DriverSubmission from 'src/components/driver/DriverSubmission'
import AlertMessage from 'src/components/AlertMessage'
import DriverSettingsButton from '../../components/driver/DriverSettingsButton'


@inject(stores => {
  const { driverListStore } = stores
  const { driverList, getDriverList, redirectToSettings, loading, error } = driverListStore
  return {
    driverList,
    getDriverList,
    redirectToSettings,
    loading,
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
    loading: PropTypes.bool,
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
        <AlertMessage bsStyle='danger' message={this.props.error}/>
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
        {this.props.loading? <h3>Loading...</h3> : this.renderDriverList()}
      </div>
    )
  }
}

export default DriverListPage