import React, { Component } from 'react'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import _ from 'lodash'
import { Jumbotron } from 'reactstrap'
import PropTypes from 'prop-types'
import DriverSubmission from '../../components/driver/DriverSubmission';


@inject(stores => {
  const { driverListStore } = stores
  const { driverList, getDriverList } = driverListStore
  return {
    driverList,
    getDriverList,
  }
})
@observer
class DriverListPage extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    driverList: MobxPropTypes.observableArray,
    getDriverList: PropTypes.func,
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

  render() {
    return (
      <div>
        <Jumbotron>
          <h3 className='display-6'>司机列表</h3>
        </Jumbotron>
        {this.renderDriverList()}
      </div>
    )
  }
}

export default DriverListPage