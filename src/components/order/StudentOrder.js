import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import _ from 'lodash'
import DriverSubmission from '../driver/DriverSubmission'


@observer
class StudentOrder extends Component {
  constructor(props) {
    super(props)
    this.onCancelOrder = this.onCancelOrder.bind(this)
  }

  onCancelOrder({ studentWechatId }) {
    const { cancelOrder } = this.props
    cancelOrder({ studentWechatId })

  }

  render() {
    const { studentOrder, studentWechatId }  = this.props
    const { driver } = studentOrder
    if(_.isNil(driver)) {
      return (<div>该用户没有司机要, 忒可怜</div>)
    }
    return (
      <div>
        <ListGroupItem>
          <DriverSubmission driverSubmission={driver}/>
          <Button
            onClick={() =>
              this.onCancelOrder({
                studentWechatId: studentWechatId,
              })}
            bsStyle='danger'>取消订单</Button>
        </ListGroupItem>
      </div>
    )
  }
}

StudentOrder.propTypes = {
  studentOrder: PropTypes.object,
  driver: PropTypes.object,
  cancelOrder: PropTypes.func,
  studentWechatId: PropTypes.string,
}

export default StudentOrder