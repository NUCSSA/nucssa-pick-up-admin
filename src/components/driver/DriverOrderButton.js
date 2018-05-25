import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Button } from 'react-bootstrap'


@observer
class DriverOrderButton extends Component {
  constructor(props) {
    super(props)
    this.onCancelOrder = this.onCancelOrder.bind(this)
  }

  onCancelOrder(e) {
    e.preventDefault()
    const { cancelStudentOrder, studentWechatId } = this.props
    cancelStudentOrder({ studentWechatId })
  }

  render() {
    return (
      <div>
        <Button
          onClick={this.onCancelOrder}
          bsStyle='danger'>取消订单</Button>
      </div>
    )
  }
}

DriverOrderButton.propTypes = {
  cancelStudentOrder: PropTypes.func.isRequired,
  studentWechatId: PropTypes.string.isRequired,
}

export default DriverOrderButton