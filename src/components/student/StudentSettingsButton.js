import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Button } from 'react-bootstrap'


@observer
class StudentSettingsButton extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(e) {
    e.preventDefault()
    this.props.redirectToSettings()
  }

  render() {
    return (
      <div>
        <Button bsStyle="info" onClick={this.onClick}>查看/设置</Button>
      </div>
    )
  }
}

StudentSettingsButton.propTypes = {
  redirectToSettings: PropTypes.func.isRequired,
}

export default StudentSettingsButton