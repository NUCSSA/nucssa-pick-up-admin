import React, { Component } from 'react'
import InfoCard from 'src/components/InfoCard'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

@inject(stores => {
  let { auth } = stores
  return {
    authStore: auth,
  }
})
@observer
class HomePage extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    authStore: PropTypes.object,
  }
  render() {
    const { authStore } = this.props
    const isAuthenticated = authStore.isAuthenticated
    return (
      <div>
        {isAuthenticated ?
          (<InfoCard/>) :
          (<div>
            <h4>Please login first.</h4>
            <Button onClick={authStore.login}>Log In</Button>
          </div>)}
      </div>
    )
  }
}

export default HomePage
