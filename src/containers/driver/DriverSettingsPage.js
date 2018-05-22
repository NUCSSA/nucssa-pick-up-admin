import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { ListGroupItem } from 'react-bootstrap'
import _ from 'lodash'
import VerifyDriverButton from 'src/components/driver/VerifyDriverButton'
import DriverInfo from 'src/components/driver/DriverInfo'
import DriverOrders from '../../components/order/DriverOrders'


@inject(stores => {
  const { driverStore, driverOrderStore } = stores
  const {
    getDriverInfo,
    driverInfo,
    verifyDriver,
    updateDriverInfo,
    loading,
    error,
  } = driverStore
  const { driverOrders,getDriverOrders, cancelStudentOrder } = driverOrderStore
  // const { cancelOrder }  = orderStore
  return {
    getDriverInfo,
    driverOrders,
    getDriverOrders,
    cancelStudentOrder,
    driverInfo,
    verifyDriver,
    updateDriverInfo,
    loading,
    error,
  }
})
@observer
class DriverSettingsPage extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    getDriverInfo: PropTypes.func,
    getDriverOrders: PropTypes.func,
    driverInfo: PropTypes.object,
    driverOrders: MobxPropTypes.observableArray,
    cancelStudentOrder: PropTypes.func,
    verifyDriver: PropTypes.func,
    updateDriverInfo: PropTypes.func,
    match: PropTypes.object,
    loading: PropTypes.bool,
  }

  componentWillMount() {
    const { driverWechatId }  = this.props.match.params
    this.props.getDriverInfo( { driverWechatId })
    this.props.getDriverOrders({ driverWechatId })
  }

  render() {
    const {
      driverInfo,
      driverOrders,
      cancelStudentOrder,
      verifyDriver,
      loading,
      updateDriverInfo } = this.props

    if (loading === true) {
      return (<h3>Loading...</h3>)
    }

    if (_.isNil(driverInfo)) {
      return (<h3>Driver not exist</h3>)
    }
    const { wechatId, verified } = driverInfo

    const verifyDriverAction = () => {
      verifyDriver({
        driverWechatId: wechatId,
      })
    }
    return (
      <div>
        <ListGroupItem><b>微信ID</b>: {wechatId}</ListGroupItem>
        <ListGroupItem>
          <b>验证状态</b>:
          { verified?
            <span> 已验证</span> :
            <span>
              <span> 未验证</span>
              <VerifyDriverButton verifyDriver={verifyDriverAction}/>
            </span>
          }
        </ListGroupItem>
        <ListGroupItem>
          <DriverInfo
            wechatId={wechatId}
            updateDriverInfo={updateDriverInfo}
            driverSubmission={driverInfo}/>
        </ListGroupItem>
        <ListGroupItem>
          <b>接单状态</b>:
          <DriverOrders
            driverOrders={driverOrders}
            driverWechatId={wechatId}
            cancelStudentOrder={cancelStudentOrder}
          />
        </ListGroupItem>
      </div>
    )
  }
}
export default DriverSettingsPage