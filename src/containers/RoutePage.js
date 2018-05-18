import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import _ from 'lodash'
import PropTypes from 'prop-types'

import {
  LOGIN,
  ADMIN,
} from 'src/data/route'

import LoginPage from './LoginPage'
import AdminRoutePage from './admin/AdminRoutePage'

@withRouter
@inject(stores=> {
  const { authStore } = stores
  const { handleAuthentication, isProcessingAuth, authResult } = authStore

  return {
    handleAuthentication,
    isProcessingAuth,
    authResult,
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
  }


  render() {
    const { handleAuthentication, authResult }  = this.props

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
        <Switch>
          <Route path={ADMIN} component={AdminRoutePage}/>
          <Route path={'*'} component={() => <Redirect to={ADMIN}/> } />
        </Switch>
      )
    }
  }
}

export default RoutePage
