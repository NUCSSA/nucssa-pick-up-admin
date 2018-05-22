import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import _ from 'lodash'
import StudentSubmission from '../student/StudentSubmission'


@observer
class DriverOrders extends Component {
  constructor(props) {
    super(props)
    this.onCancelOrder = this.onCancelOrder.bind(this)
  }

  onCancelOrder({ studentWechatId }) {
    const { cancelStudentOrder } = this.props
    cancelStudentOrder({ studentWechatId })

  }

  render() {
    const { driverOrders }  = this.props
    if(driverOrders.length === 0) {
      return (<div>这个司机还没有接单</div>)
    }
    return _.map(driverOrders, (o) => {
      return (
        <div key={o.studentWechatId}>
          <ListGroupItem>
            <StudentSubmission studentSubmission={o.student}/>
            <Button
              onClick={() =>
                this.onCancelOrder({
                  studentWechatId: o.studentWechatId,
                })}
              bsStyle='danger'>取消订单</Button>
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