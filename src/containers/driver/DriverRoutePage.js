import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import _ from 'lodash'
import PropTypes from 'prop-types'

// import DriverLoginPage from './DriverLoginPage'
import DriverListPage from './DriverListPage'
// import DriverOrdersPage from './DriverOrdersPage'
// import DriverNavBar from 'src/components/driver/NavBar'
import { DRIVER_LIST } from 'src/data/route/index'


class DriverRoutePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // let { driverId, signOut, loadingDriverInfo } = this.props
    return (
      <div>
        <Switch>
          <Route path={DRIVER_LIST} component={DriverListPage}/>
          <Route path={'*'} component={() => <Redirect to={DRIVER_LIST}/> } />
        </Switch>
      </div>
    )
  }
}

export default DriverRoutePage