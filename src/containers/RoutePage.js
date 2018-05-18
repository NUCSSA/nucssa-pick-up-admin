import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import _ from 'lodash'
import PropTypes from 'prop-types'
import NavBar from 'src/components/NavBar'


import {
  LOGIN,
  ROOT,
} from 'src/data/route'

import LoginPage from './LoginPage'
import HomePage from './HomePage'

@withRouter
@inject(stores=> {
  const { authStore } = stores
  const {
    handleAuthentication,
    isProcessingAuth,
    authResult,
    logout } = authStore

  return {
    handleAuthentication,
    isProcessingAuth,
    authResult,
    logout,
  }
})
@observer
class RoutePage extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    handleAuthentication: PropTypes.func,
    authResult: PropTypes.object,
    logout: PropTypes.func,
  }


  render() {
    const { handleAuthentication, authResult, logout }  = this.props

    if (/access_token|id_token|error/.test(location.hash)) {
      handleAuthentication()
      return (<h1>Loading...</h1>)

    }

    if (_.isNil(authResult)) {
      return(
        <Switch>
          <Route path={LOGIN} component={LoginPage}/>
          <Route path={'*'} component={() => <Redirect to={LOGIN}/> } />
        </Switch>
      )
    } else {
      return (
        <div>
          <NavBar logout={logout}/>
          <Switch>
            <Route exact path={ROOT} component={HomePage}/>
            <Route path={'*'} component={() => <Redirect to={ROOT}/> } />
          </Switch>
        </div>
      )

    }
  }
}

export default RoutePage
