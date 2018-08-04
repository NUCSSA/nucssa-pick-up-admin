import React, { Component } from 'react'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import _ from 'lodash'
import { Jumbotron } from 'reactstrap'
import PropTypes from 'prop-types'
import AlertMessage from 'src/components/AlertMessage'

@inject(stores => {
  const { driverReportStore } = stores
  const { driverReportList, getDriverReport, loading, error } = driverReportStore
  return {
    driverReportList,
    getDriverReport,
    loading,
    error,
  }
})
@observer
class DriverReportPage extends Component {
  constructor(props) {
    super(props)
    this.renderError = this.renderError.bind(this)
    this.renderDriverReport =  this.renderDriverReport.bind(this)
  }

  static propTypes = {
    driverReportList: MobxPropTypes.observableArray,
    getDriverReport: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.string,
  }

  componentWillMount() {
    const { getDriverReport } = this.props
    getDriverReport()
  }

  renderError() {
    if (!_.isNil(this.props.error)) {
      return (
        <AlertMessage bsStyle='danger' message={this.props.error}/>
      )
    }
  }

  renderDriverReport() {

    const { driverReportList } = this.props
    return _.map(driverReportList, (report) => {
      return (
        <div key={report._id}>
          <h3>微信ID: {report._id}</h3>
          <h3>接单数: {report.count}</h3>
          <hr/>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        {this.renderError()}
        <Jumbotron>
          <h3 className='display-6'>司机列表</h3>
        </Jumbotron>
        {this.props.loading? <h3>Loading...</h3> : this.renderDriverReport()}
      </div>
    )
  }
}

export default DriverReportPage