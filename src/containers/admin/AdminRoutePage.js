import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import _ from 'lodash'
import PropTypes from 'prop-types'

import {
  ADMIN,
} from 'src/data/route'
import AdminHomePage from './AdminHomePage'
import AdminNavBar from '../../components/admin/AdminNavBar';


@withRouter
@inject(stores=> {
  const { authStore } = stores
  const { logout } = authStore

  return {
    logout,
  }
})
@observer
class AdminRoutePage extends Component {
  constructor(props) {
    super(props)
  }
    static propTypes = {
      logout: PropTypes.func,
    }


    render() {
      const { logout }  = this.props
      return (
        <div>
          <AdminNavBar logout={logout}/>
          <Switch>
            <Route exact path={ADMIN} component={AdminHomePage}/>
            <Route path={'*'} component={() => <Redirect to={ADMIN}/> } />
          </Switch>
        </div>
      )
    }
}

export default AdminRoutePage
