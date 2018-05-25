import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { ListGroupItem } from 'react-bootstrap'
import _ from 'lodash'
import StudentSubmission from '../student/StudentSubmission'
import DriverOrderButton from '../driver/DriverOrderButton'


@observer
class DriverOrders extends Component {
  constructor(props) {
    super(props)
    // this.onCancelOrder = this.onCancelOrder.bind(this)
  }

  // onCancelOrder({ studentWechatId }) {
  //   const { cancelStudentOrder } = this.props
  //   cancelStudentOrder({ studentWechatId })
  //
  // }

  render() {
    const { driverOrders, cancelStudentOrder }  = this.props
    if(driverOrders.length === 0) {
      return (<div>这个司机还没有接单</div>)
    }
    return _.map(driverOrders, (o) => {
      return (
        <div key={o.studentWechatId}>
          <ListGroupItem>
            <StudentSubmission studentSubmission={o.student}/>
            <DriverOrderButton
              studentWechatId={o.studentWechatId}
              cancelStudentOrder={cancelStudentOrder}/>
          </ListGroupItem>
        </div>
      )
    })
  }
}

DriverOrders.propTypes = {
  driverOrders: MobxPropTypes.observableArray,
  cancelStudentOrder: PropTypes.func,
  driverWechatId: PropTypes.string,
}

export default DriverOrders