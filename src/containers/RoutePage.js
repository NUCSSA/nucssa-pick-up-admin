import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  ROOT,
  LOGIN,
} from 'src/data/route'

import HomePage from './HomePage'
import LoginPage from './LoginPage'

@inject(stores=> {
  const { authStore } = stores
  const { handleAuthentication, isAuthenticated } = authStore
  return {
    handleAuthentication,
    isAuthenticated,
  }
})
@observer
class RoutePage extends Component {
  constructor(props) {
    super(props)
  }
    static propTypes = {
      handleAuthentication: PropTypes.func,
      isAuthenticated: PropTypes.bool,
    }

    render() {
      const { handleAuthentication, isAuthenticated }  = this.props

      if (/access_token|id_token|error/.test(location.hash)) {
        handleAuthentication()
        return <h1>Loading...</h1>
      }
      if (isAuthenticated === false) {
        return(
          <Switch>
            <Route path={LOGIN} component={LoginPage}/>
            <Route path={'*'} component={() => <Redirect to={LOGIN}/> } />
          </Switch>
        )
      } else {
        return (
          <Switch>
            <Route exact path={ROOT} component={HomePage}/>
          </Switch>
        )
      }
    }
}

export default RoutePage
