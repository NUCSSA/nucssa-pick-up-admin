import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Button } from 'react-bootstrap'


@observer
class DriverOrders extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div>
          list here
      </div>
    )
  }
}

DriverOrders.propTypes = {
  // redirectToSettings: PropTypes.func.isRequired,
}

export default DriverOrders