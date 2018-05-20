import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Button } from 'reactstrap'
import { Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {withRouter} from 'react-router'
import InfoCard from '../components/InfoCard'
import AlertMessage from '../components/AlertMessage'

@withRouter
@inject(stores => {
  const { authStore } = stores
  const { login, error } = authStore
  return {
    login,
    error,
  }
})
@observer
class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.renderError = this.renderError.bind(this)

  }

    static propTypes = {
      login: PropTypes.func,
      error: PropTypes.string,

    }
    renderError() {
      if (!_.isNil(this.props.error)) {
        return (
          <AlertMessage bsStyle={'danger'} message={this.props.error}/>
        )
      }
    }
    render() {
      const { login } = this.props
      return (
        <div>
          {this.renderError()}
          <InfoCard/>
          <Button onClick={login}>Login</Button>
        </div>
      )
    }
}

export default LoginPage
