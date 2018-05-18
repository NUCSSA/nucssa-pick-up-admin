import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navbar, Nav, NavbarBrand } from 'reactstrap'
import { Button } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

// import { DRIVER_HOME, DRIVER_ORDERS, ORDER_QUERY } from 'src/data/route'

@observer
class AdminNavBar extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout() {
    this.props.logout()
  }

  render() {
    return (
      <div>
        <Navbar color="light" light>
          <NavbarBrand>NUCSSA Admin Page</NavbarBrand>
          <Nav navbar>
            <Link to={'/'}>
              <Button className={'pull-right'}>
                Home
              </Button>
            </Link>
          </Nav>
          <Nav navbar>
            <Link to={'/'}>
              <Button className={'pull-right'}>
                blah1
              </Button>
            </Link>
          </Nav>
          <Nav navbar>
            <Link to={'/'}>
              <Button className={'pull-right'}>
                blah2
              </Button>
            </Link>
          </Nav>
          <Nav className="ml-auto" navbar>
            <Button className={'pull-right'} bsStyle='danger' onClick={this.logout}>
              Logout
            </Button>
          </Nav>
        </Navbar>
      </div>
    )
  }
}

AdminNavBar.propTypes = {
  logout: PropTypes.func.isRequired,
}

export default AdminNavBar