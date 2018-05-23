import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'


class AlertMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
    }
  }

  // componentDidMount() {
  //   setTimeout(() => {this.setState({ visible: false})}, 3000)
  // }
  static propTypes = {
    bsStyle: PropTypes.string,
    message: PropTypes.string,
  }

  render() {
    if(this.state.visible) {
      return (
        <div>
          <Alert bsStyle={this.props.bsStyle}>
            {this.props.message}
          </Alert>
        </div>
      )
    } return (null)
  }
}
export default AlertMessage