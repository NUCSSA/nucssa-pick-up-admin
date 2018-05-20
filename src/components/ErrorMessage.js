import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'


class ErrorMessage extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    message: PropTypes.string,
  }

  render() {
    return (
      <div>
        <Alert bsStyle='danger'>
          {this.props.message}
        </Alert>
      </div>
    )
  }
}
export default ErrorMessage