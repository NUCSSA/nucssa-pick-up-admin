import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'

@inject(stores => {
  const { authStore } = stores
  const { login } = authStore
  return {
    login,
  }
})
@observer
class LoginPage extends Component {
  constructor(props) {
    super(props)
  }

    static propTypes = {
      login: PropTypes.func,
    }

    render() {
      const { login } = this.props
      return (
        <div>
          <Button onClick={login}>Login</Button>
        </div>
      )
    }
}

export default LoginPage
