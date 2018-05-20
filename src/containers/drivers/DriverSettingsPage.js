import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import _ from 'lodash'
import VerifyDriverButton from '../../components/driver/VerifyDriverButton';


@inject(stores => {
  const { driverStore } = stores
  const { getDriverInfo, driverInfo, verifyDriver, loading, error } = driverStore
  return {
    getDriverInfo,
    driverInfo,
    verifyDriver,
    loading,
    error,
  }
})
@observer
class DriverSettingsPage extends Component {
  constructor(props) {
    super(props)
  }
  // render() {
  //   let {
  //     wechatId,
  //     name,
  //     gender,
  //     huskyEmail,
  //     email,
  //     status,
  //     degree,
  //     phone,
  //     carType,
  //     remark,
  //     verified,
  //   } = this.props.driverSubmission


  static propTypes = {
    // driver: MobxPropTypes.observableObject,
    driverWechatId: PropTypes.string,
    getDriverInfo: PropTypes.func,
    driverInfo: PropTypes.object,
    verifyDriver: PropTypes.func,
    // orderDetail: MobxPropTypes.observableObject,
    match: PropTypes.object,
    loading: PropTypes.bool,
  }

  componentWillMount() {
    const { driverWechatId }  = this.props.match.params
    this.props.getDriverInfo( {driverWechatId})
    // this.props.getOrderList( {driverWechatId} )
  }

  render() {
    const { driverInfo, verifyDriver, loading } = this.props

    if (loading === true) {
      return (<h3>Loading</h3>)
    }

    if (_.isNil(driverInfo)) {
      return (<h3>Driver not exist</h3>)
    }
    const {
      wechatId,
      name,
      gender,
      huskyEmail,
      email,
      status,
      degree,
      phone,
      carType,
      remark,
      verified,
    } = driverInfo

    const verifyDriverAction = () => {
      verifyDriver({
        driverWechatId: wechatId,
      })
    }
    return (
      <div>
        <VerifyDriverButton verifyDriver={verifyDriverAction}/>
        <ListGroup>
          <ListGroupItem>主要负责人微信: { wechatId }</ListGroupItem>
          <ListGroupItem>姓名: { name }</ListGroupItem>
          <ListGroupItem>性别: { gender }</ListGroupItem>
          <ListGroupItem>NEU husky邮箱: { huskyEmail }</ListGroupItem>
          {
            remark && <ListGroupItem>邮箱: { email }</ListGroupItem>
          }
          <ListGroupItem>就读状态: { status }</ListGroupItem>
          <ListGroupItem>就读项目: { degree }</ListGroupItem>
          <ListGroupItem>电话: { phone }</ListGroupItem>
          <ListGroupItem>车型: { carType }</ListGroupItem>
          {
            remark && <ListGroupItem>备注: { remark }</ListGroupItem>
          }
          <ListGroupItem>
            <b>验证状态</b>:
            { verified?
              <span>已验证</span> :
              <span>未验证</span>
            }
          </ListGroupItem>
        </ListGroup>
      </div>
    )
  }
}
export default DriverSettingsPage