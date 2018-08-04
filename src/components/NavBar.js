import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navbar, Nav, NavbarBrand } from 'reactstrap'
import { Button } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import { ROOT, DRIVER, STUDENT, DRIVER_REPORT } from 'src/data/route'

@observer
class NavBar extends Component {
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
            <Link to={ROOT}>
              <Button className={'pull-right'}>
                Home
              </Button>
            </Link>
          </Nav>
          <Nav navbar>
            <Link to={STUDENT}>
              <Button className={'pull-right'}>
                学生
              </Button>
            </Link>
          </Nav>
          <Nav navbar>
            <Link to={DRIVER}>
              <Button className={'pull-right'}>
                司机
              </Button>
            </Link>
          </Nav>

          <Nav navbar>
            <Link to={DRIVER_REPORT}>
              <Button className={'pull-right'}>
                接单报告
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

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
}

export default NavBar