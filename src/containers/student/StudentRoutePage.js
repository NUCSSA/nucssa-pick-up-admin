import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import StudentListPage from './StudentListPage'
import { STUDENT_LIST, STUDENT_SETTINGS } from 'src/data/route/index'
import StudentSettingsPage from './StudentSettingsPage'


class StudentRoutePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path={STUDENT_LIST} component={StudentListPage}/>
          <Route path={STUDENT_SETTINGS} component={StudentSettingsPage}/>
          <Route path={'*'} component={() => <Redirect to={STUDENT_LIST}/> } />
        </Switch>
      </div>
    )
  }
}

export default StudentRoutePage