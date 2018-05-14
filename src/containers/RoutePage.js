import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import {
  ROOT,
} from 'src/data/route'

import HomePage from './HomePage'
import CallbackPage from './admin/CallbackPage'

class RoutePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Switch>
        <Route exact path={ROOT} component={HomePage} />
        <Route path="/test" component={CallbackPage}/>
      </Switch>
    )
  }
}

export default RoutePage